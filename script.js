// ==========================================================
// BC CareerCraft - script.js
// ==========================================================

const STORAGE_KEY = "bcCareerCraftDraft";
const FIELD_IDS = ["fullName", "jobTitle", "email", "phone", "location", "linkedin", "summary", "awards"];
const TEMPLATES = ["modern", "classic", "creative"];

const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_PHOTO_FILE_BYTES = 10 * 1024 * 1024; // 10 MB upload limit
const CROP_VIEW = 280;                          // size of the on-screen crop box
const PHOTO_OUTPUT = 400;                       // saved photo: 400 x 400 square

const TAG_CONFIG = {
  expertise: { max: 12, maxLength: 100 },
  certifications: { max: 10, maxLength: 120 },
  skills: { max: 20, maxLength: 60 }
};

const EDUCATION_MAX = 5;
const EXPERIENCE_MAX = 8;
const TEXT_LIMIT = 200;

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const byId = id => document.getElementById(id);

const resumeForm = byId("resumeForm");
const resumeOutput = byId("resumeOutput");
const resumePreview = byId("resumePreview");
const printButton = byId("printResume");
const clearButton = byId("clearForm");
const templateCards = document.querySelectorAll(".template-card");
const menuToggle = byId("menuToggle");
const mainNav = byId("mainNav");

const photoInput = byId("photoInput");
const photoButton = byId("photoButton");
const removePhotoButton = byId("removePhoto");
const photoPreview = byId("photoPreview");
const photoError = byId("photoError");
const photoCropper = byId("photoCropper");
const cropCanvas = byId("cropCanvas");
const cropZoom = byId("cropZoom");

const linkedinError = byId("linkedinError");

let selectedTemplate = "modern";
let photoData = ""; // saved square photo as a data URL, or "" for no photo
const tagState = { expertise: [], certifications: [], skills: [] };

byId("year").textContent = new Date().getFullYear();

// ---------- Helpers ----------

// Escape user-entered text before displaying it as HTML.
function escapeHTML(value) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return String(value).replace(/[&<>"']/g, character => entities[character]);
}

function getValue(id) {
  return byId(id).value.trim();
}

function cleanText(value, limit) {
  return typeof value === "string" ? value.slice(0, limit || TEXT_LIMIT) : "";
}

// ---------- Simple dropdown lists (datalists) ----------

function fillDatalist(listId, items) {
  const list = byId(listId);
  if (!list || !Array.isArray(items)) return;

  const fragment = document.createDocumentFragment();
  [...new Set(items)]
    .sort((a, b) => a.localeCompare(b))
    .forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      fragment.appendChild(option);
    });
  list.appendChild(fragment);
}

if (typeof JOB_ROLES !== "undefined") fillDatalist("jobRoleList", JOB_ROLES);
if (typeof EXPERTISE_AREAS !== "undefined") fillDatalist("expertiseList", EXPERTISE_AREAS);
if (typeof CERTIFICATIONS !== "undefined") fillDatalist("certificationsList", CERTIFICATIONS);
if (typeof SKILLS !== "undefined") fillDatalist("skillsList", SKILLS);
if (typeof COMPANIES !== "undefined") fillDatalist("companyList", COMPANIES);

// ---------- Tag pickers (expertise, skills, certifications) ----------

function renderTags(kind) {
  const list = byId(kind + "Tags");
  list.textContent = "";

  tagState[kind].forEach((tag, index) => {
    const item = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = tag;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "\u00d7";
    remove.setAttribute("aria-label", "Remove " + tag);
    remove.addEventListener("click", () => {
      tagState[kind].splice(index, 1);
      byId(kind + "Error").textContent = "";
      renderTags(kind);
      saveDraft();
    });

    item.append(label, remove);
    list.appendChild(item);
  });
}

function addTag(kind) {
  const input = byId(kind + "Input");
  const error = byId(kind + "Error");
  const { max, maxLength } = TAG_CONFIG[kind];
  const value = input.value.trim().replace(/\s+/g, " ");

  error.textContent = "";
  if (!value) return;

  if (value.length > maxLength) {
    error.textContent = `Please keep each entry under ${maxLength} characters.`;
    return;
  }
  if (tagState[kind].some(tag => tag.toLowerCase() === value.toLowerCase())) {
    error.textContent = "That one is already added.";
    return;
  }
  if (tagState[kind].length >= max) {
    error.textContent = `You can add up to ${max}. Remove one to add another.`;
    return;
  }

  tagState[kind].push(value);
  input.value = "";
  renderTags(kind);
  saveDraft();
}

Object.keys(TAG_CONFIG).forEach(kind => {
  byId(kind + "Add").addEventListener("click", () => addTag(kind));

  byId(kind + "Input").addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault(); // Enter must not submit the whole form
      addTag(kind);
    }
  });
});

// Old drafts stored skills as free text such as "Tools: Excel, Word".
function parseLegacySkills(text) {
  const found = [];
  String(text).split(/\n|;/).forEach(line => {
    const withoutLabel = line.replace(/^[^:,]{1,40}:\s*/, "");
    withoutLabel.split(",").forEach(part => {
      const skill = part.trim();
      if (skill && skill.length <= TAG_CONFIG.skills.maxLength &&
          !found.some(item => item.toLowerCase() === skill.toLowerCase())) {
        found.push(skill);
      }
    });
  });
  return found.slice(0, TAG_CONFIG.skills.max);
}

// ---------- Search-as-you-type suggestions (colleges and schools) ----------

// Lower-case and drop dots and apostrophes so "AKT" finds "A.K.T." and "Bedes" finds "Bede's".
function normalizeKey(text) {
  return String(text).toLowerCase().replace(/[.'\u2019]/g, "");
}

function makeRecord(label, value, hint, searchText) {
  return {
    label,
    value,
    hint,
    key: normalizeKey(searchText || label + " " + value),
    nameKey: normalizeKey(label)
  };
}

let institutionPromise = null;

// Loads the national college list (colleges.json) the first time it is needed.
function loadInstitutions() {
  if (institutionPromise) return institutionPromise;

  institutionPromise = (async () => {
    const curated = (typeof COLLEGES !== "undefined" ? COLLEGES : [])
      .map(value => makeRecord(value, value, "Popular", value));

    try {
      if (window.location.protocol === "file:") throw new Error("Opened as a local file");
      const response = await fetch("colleges.json");
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();

      const records = data.rows.map(row => {
        const name = row[0];
        const district = row[1];
        const state = data.states[row[2]] || "";
        const value = district ? `${name}, ${district}` : name;
        return makeRecord(name, value, [district, state].filter(Boolean).join(", "), `${name} ${district} ${state}`);
      });
      return { records: curated.concat(records), complete: true };
    } catch (error) {
      institutionPromise = null; // try again next time
      return { records: curated, complete: false };
    }
  })();

  return institutionPromise;
}

let schoolPromise = null;

function loadSchools() {
  if (!schoolPromise) {
    const records = (typeof SCHOOLS !== "undefined" ? SCHOOLS : [])
      .map(value => makeRecord(value, value, "", value));
    schoolPromise = Promise.resolve({ records, complete: true });
  }
  return schoolPromise;
}

function searchRecords(records, query, limit) {
  const q = normalizeKey(query.trim());
  if (!q) return [];

  const tokens = q.split(/[\s,]+/).filter(Boolean);
  const starts = [];
  const contains = [];
  const others = [];

  for (const record of records) {
    let matches = true;
    for (const token of tokens) {
      if (!record.key.includes(token)) {
        matches = false;
        break;
      }
    }
    if (!matches) continue;

    if (record.nameKey.startsWith(q)) starts.push(record);
    else if (record.nameKey.includes(q)) contains.push(record);
    else others.push(record);

    if (starts.length >= limit) break;
  }

  return starts.concat(contains, others).slice(0, limit);
}

// Wraps a text input with a suggestion list. getSource() returns a promise of
// { records, complete } and may change over time (for example school vs college).
function createSuggestInput(input, getSource, options) {
  const minChars = (options && options.minChars) || 2;
  const onPick = (options && options.onPick) || (() => {});

  const wrap = document.createElement("div");
  wrap.className = "suggest-wrap";

  const panel = document.createElement("ul");
  panel.className = "suggest-panel";
  panel.setAttribute("role", "listbox");
  panel.hidden = true;

  input.setAttribute("role", "combobox");
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-expanded", "false");

  wrap.append(input, panel);

  let results = [];
  let active = -1;
  let timer = null;
  let runId = 0;
  let skipNext = false;

  function close() {
    panel.hidden = true;
    input.setAttribute("aria-expanded", "false");
    active = -1;
  }

  function setActive(index) {
    active = index;
    [...panel.querySelectorAll("[role=option]")].forEach((item, i) => {
      item.classList.toggle("active", i === index);
      item.setAttribute("aria-selected", String(i === index));
      if (i === index) item.scrollIntoView({ block: "nearest" });
    });
  }

  function pick(record) {
    skipNext = true;
    input.value = record.value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    onPick(record);
    close();
  }

  function showMessage(text) {
    panel.textContent = "";
    const item = document.createElement("li");
    item.className = "suggest-status";
    item.textContent = text;
    panel.appendChild(item);
    panel.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function render(found, complete) {
    panel.textContent = "";
    results = found;
    active = -1;

    if (!found.length) {
      showMessage("No match found. Keep typing, or just enter the name yourself.");
      return;
    }

    found.forEach(record => {
      const item = document.createElement("li");
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", "false");

      const name = document.createElement("span");
      name.className = "suggest-name";
      name.textContent = record.label;
      item.appendChild(name);

      if (record.hint) {
        const hint = document.createElement("span");
        hint.className = "suggest-hint";
        hint.textContent = record.hint;
        item.appendChild(hint);
      }

      item.addEventListener("mousedown", event => {
        event.preventDefault(); // keeps focus in the input
        pick(record);
      });
      panel.appendChild(item);
    });

    if (!complete) {
      const note = document.createElement("li");
      note.className = "suggest-status";
      note.textContent = "Showing popular colleges only. The full list loads on the live website.";
      panel.appendChild(note);
    }

    panel.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  async function run() {
    const query = input.value.trim();
    if (query.length < minChars) {
      close();
      return;
    }

    const id = ++runId;
    const pending = getSource();
    const source = await pending;
    if (id !== runId) return;

    render(searchRecords(source.records, query, 30), source.complete);
  }

  input.addEventListener("input", () => {
    if (skipNext) {
      skipNext = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(run, 120);
  });

  input.addEventListener("focus", () => {
    getSource(); // start loading early
    if (input.value.trim().length >= minChars) run();
  });

  input.addEventListener("blur", close);

  input.addEventListener("keydown", event => {
    const open = !panel.hidden && results.length;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) run();
      else setActive((active + 1) % results.length);
    } else if (event.key === "ArrowUp" && open) {
      event.preventDefault();
      setActive((active - 1 + results.length) % results.length);
    } else if (event.key === "Enter" && open && active >= 0) {
      event.preventDefault();
      pick(results[active]);
    } else if (event.key === "Escape") {
      close();
    }
  });

  return wrap;
}

// ---------- Education (several optional entries) ----------

function blankEducation() {
  return { level: "", degree: "", specialization: "", college: "", year: "" };
}

let educationEntries = [blankEducation()];

function isSchoolLevel(level) {
  return typeof SCHOOL_LEVELS !== "undefined" && SCHOOL_LEVELS.includes(level);
}

function degreesForLevel(level) {
  if (typeof EDUCATION_CATALOG === "undefined") return [];
  return EDUCATION_CATALOG
    .filter(item => !level || item.level === level)
    .map(item => item.name);
}

function specializationsForDegree(degree) {
  if (typeof EDUCATION_CATALOG === "undefined" || typeof SPECIALIZATIONS === "undefined") return [];
  const wanted = degree.trim().toLowerCase();
  const match = EDUCATION_CATALOG.find(item => item.name.toLowerCase() === wanted);
  return match && match.stream ? SPECIALIZATIONS[match.stream] || [] : [];
}

function setOptions(datalist, items) {
  datalist.textContent = "";
  [...new Set(items)].forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    datalist.appendChild(option);
  });
}

function makeField(labelText, control, extraClass) {
  const label = document.createElement("label");
  if (extraClass) label.className = extraClass;
  label.append(labelText, control);
  return label;
}

function makeTextInput(value, placeholder, maxLength) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = value;
  input.placeholder = placeholder;
  input.maxLength = maxLength;
  input.autocomplete = "off";
  return input;
}

function makeSelect(placeholder, options, value) {
  const select = document.createElement("select");
  select.add(new Option(placeholder, ""));
  options.forEach(([optionValue, optionLabel]) => select.add(new Option(optionLabel, optionValue)));
  select.value = value;
  return select;
}

function renderEducation() {
  const container = byId("educationEntries");
  container.textContent = "";

  educationEntries.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = "edu-entry";

    const header = document.createElement("div");
    header.className = "edu-entry-header";
    const title = document.createElement("strong");
    title.textContent = "Qualification " + (index + 1);
    header.appendChild(title);

    if (educationEntries.length > 1) {
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "edu-remove";
      remove.textContent = "Remove";
      remove.setAttribute("aria-label", "Remove qualification " + (index + 1));
      remove.addEventListener("click", () => {
        educationEntries.splice(index, 1);
        renderEducation();
        saveDraft();
      });
      header.appendChild(remove);
    }

    const levelOptions = typeof EDUCATION_LEVELS !== "undefined"
      ? EDUCATION_LEVELS.map(level => [level.value, level.label])
      : [];
    const levelSelect = makeSelect("Select level", levelOptions, entry.level);

    const degreeList = document.createElement("datalist");
    degreeList.id = "degreeList-" + index;
    const degreeInput = makeTextInput(entry.degree, "Select or type a degree / course", TEXT_LIMIT);
    degreeInput.setAttribute("list", degreeList.id);

    const specList = document.createElement("datalist");
    specList.id = "specList-" + index;
    const specInput = makeTextInput(entry.specialization, "Branch / specialization", TEXT_LIMIT);
    specInput.setAttribute("list", specList.id);

    const yearInput = makeTextInput(entry.year, "e.g. 2023 or 2017 - 2019", 30);

    const collegeInput = makeTextInput(entry.college, "", TEXT_LIMIT);
    const collegeField = createSuggestInput(
      collegeInput,
      () => (isSchoolLevel(entry.level) ? loadSchools() : loadInstitutions()),
      {
        minChars: 2,
        onPick: record => {
          entry.college = record.value;
          saveDraft();
        }
      }
    );

    function refreshLists() {
      setOptions(degreeList, degreesForLevel(entry.level));
      setOptions(specList, specializationsForDegree(entry.degree));
      collegeInput.placeholder = isSchoolLevel(entry.level)
        ? "Start typing your school name, or enter it with the city"
        : "Start typing your college name, e.g. IFET Villupuram";
    }

    levelSelect.addEventListener("change", () => {
      entry.level = levelSelect.value;
      refreshLists();
      saveDraft();
    });
    degreeInput.addEventListener("input", () => {
      entry.degree = degreeInput.value;
      setOptions(specList, specializationsForDegree(entry.degree));
      saveDraft();
    });
    specInput.addEventListener("input", () => {
      entry.specialization = specInput.value;
      saveDraft();
    });
    collegeInput.addEventListener("input", () => {
      entry.college = collegeInput.value;
      saveDraft();
    });
    yearInput.addEventListener("input", () => {
      entry.year = yearInput.value;
      saveDraft();
    });

    refreshLists();

    const grid = document.createElement("div");
    grid.className = "edu-grid";
    grid.append(
      makeField("Level", levelSelect),
      makeField("Degree / Course", degreeInput),
      makeField("Branch / Specialization", specInput),
      makeField("Year", yearInput),
      makeField("School / College / University", collegeField, "span-2")
    );

    card.append(header, grid, degreeList, specList);
    container.appendChild(card);
  });

  const full = educationEntries.length >= EDUCATION_MAX;
  byId("addEducation").disabled = full;
  byId("educationError").textContent = full ? `You can add up to ${EDUCATION_MAX} qualifications.` : "";
}

byId("addEducation").addEventListener("click", () => {
  if (educationEntries.length >= EDUCATION_MAX) return;
  educationEntries.push(blankEducation());
  renderEducation();
  saveDraft();

  const levels = document.querySelectorAll("#educationEntries select");
  if (levels.length) levels[levels.length - 1].focus();
});

function restoreEducation(draft) {
  const validLevels = typeof EDUCATION_LEVELS !== "undefined" ? EDUCATION_LEVELS.map(l => l.value) : [];

  if (Array.isArray(draft.educationEntries)) {
    const restored = draft.educationEntries.slice(0, EDUCATION_MAX).map(item => ({
      level: validLevels.includes(item && item.level) ? item.level : "",
      degree: cleanText(item && item.degree),
      specialization: cleanText(item && item.specialization),
      college: cleanText(item && item.college),
      year: cleanText(item && item.year, 30)
    }));
    if (restored.length) educationEntries = restored;
    return;
  }

  // Older drafts had one "education" and one "college" field.
  if (typeof draft.education === "string" || typeof draft.college === "string") {
    educationEntries = [{
      ...blankEducation(),
      degree: cleanText(draft.education),
      college: cleanText(draft.college)
    }];
  }
}

// ---------- Work experience (one entry per company) ----------

function blankExperience() {
  return {
    company: "", title: "", startMonth: "", startYear: "",
    endMonth: "", endYear: "", current: false, description: ""
  };
}

let experienceEntries = [blankExperience()];

function monthOptions() {
  return MONTH_NAMES.map((name, i) => [String(i + 1), name]);
}

function yearOptions() {
  const options = [];
  for (let year = new Date().getFullYear(); year >= 1975; year--) {
    options.push([String(year), String(year)]);
  }
  return options;
}

function renderExperience() {
  const container = byId("experienceEntries");
  container.textContent = "";

  experienceEntries.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = "edu-entry";

    const header = document.createElement("div");
    header.className = "edu-entry-header";
    const title = document.createElement("strong");
    title.textContent = "Job " + (index + 1) + (index === 0 ? " (most recent first)" : "");
    header.appendChild(title);

    if (experienceEntries.length > 1) {
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "edu-remove";
      remove.textContent = "Remove";
      remove.setAttribute("aria-label", "Remove job " + (index + 1));
      remove.addEventListener("click", () => {
        experienceEntries.splice(index, 1);
        renderExperience();
        saveDraft();
      });
      header.appendChild(remove);
    }

    const companyInput = makeTextInput(entry.company, "Select or type the company", TEXT_LIMIT);
    companyInput.setAttribute("list", "companyList");

    const titleInput = makeTextInput(entry.title, "Select or type your job title", TEXT_LIMIT);
    titleInput.setAttribute("list", "jobRoleList");

    const startMonth = makeSelect("Month", monthOptions(), entry.startMonth);
    const startYear = makeSelect("Year", yearOptions(), entry.startYear);
    const endMonth = makeSelect("Month", monthOptions(), entry.endMonth);
    const endYear = makeSelect("Year", yearOptions(), entry.endYear);

    const currentBox = document.createElement("input");
    currentBox.type = "checkbox";
    currentBox.checked = entry.current;
    const currentLabel = document.createElement("label");
    currentLabel.className = "check-row";
    currentLabel.append(currentBox, "I currently work here");

    const description = document.createElement("textarea");
    description.rows = 4;
    description.maxLength = 2000;
    description.value = entry.description;
    description.placeholder = "Your responsibilities and achievements. One point per line works well.";

    function syncEndDate() {
      endMonth.disabled = entry.current;
      endYear.disabled = entry.current;
    }

    companyInput.addEventListener("input", () => { entry.company = companyInput.value; saveDraft(); });
    titleInput.addEventListener("input", () => { entry.title = titleInput.value; saveDraft(); });
    startMonth.addEventListener("change", () => { entry.startMonth = startMonth.value; saveDraft(); });
    startYear.addEventListener("change", () => { entry.startYear = startYear.value; saveDraft(); });
    endMonth.addEventListener("change", () => { entry.endMonth = endMonth.value; saveDraft(); });
    endYear.addEventListener("change", () => { entry.endYear = endYear.value; saveDraft(); });
    description.addEventListener("input", () => { entry.description = description.value; saveDraft(); });
    currentBox.addEventListener("change", () => {
      entry.current = currentBox.checked;
      if (entry.current) {
        entry.endMonth = "";
        entry.endYear = "";
        endMonth.value = "";
        endYear.value = "";
      }
      syncEndDate();
      saveDraft();
    });

    syncEndDate();

    const startRow = document.createElement("div");
    startRow.className = "date-row";
    startRow.append(startMonth, startYear);

    const endRow = document.createElement("div");
    endRow.className = "date-row";
    endRow.append(endMonth, endYear);

    const grid = document.createElement("div");
    grid.className = "edu-grid";
    grid.append(
      makeField("Company", companyInput),
      makeField("Job title", titleInput),
      makeField("From", startRow),
      makeField("To", endRow),
      currentLabel,
      makeField("Responsibilities", description, "span-2")
    );
    currentLabel.classList.add("span-2");

    card.append(header, grid);
    container.appendChild(card);
  });

  const full = experienceEntries.length >= EXPERIENCE_MAX;
  byId("addExperience").disabled = full;
  byId("experienceError").textContent = full ? `You can add up to ${EXPERIENCE_MAX} jobs.` : "";
}

byId("addExperience").addEventListener("click", () => {
  if (experienceEntries.length >= EXPERIENCE_MAX) return;
  experienceEntries.push(blankExperience());
  renderExperience();
  saveDraft();

  const cards = document.querySelectorAll("#experienceEntries .edu-entry");
  const last = cards[cards.length - 1];
  if (last) last.querySelector("input").focus();
});

function restoreExperience(draft) {
  const month = value => (/^(1[0-2]|[1-9])$/.test(String(value)) ? String(value) : "");
  const year = value => (/^(19|20)\d{2}$/.test(String(value)) ? String(value) : "");

  if (Array.isArray(draft.experienceEntries)) {
    const restored = draft.experienceEntries.slice(0, EXPERIENCE_MAX).map(item => {
      const current = !!(item && item.current === true);
      return {
        company: cleanText(item && item.company),
        title: cleanText(item && item.title),
        startMonth: month(item && item.startMonth),
        startYear: year(item && item.startYear),
        endMonth: current ? "" : month(item && item.endMonth),
        endYear: current ? "" : year(item && item.endYear),
        current,
        description: cleanText(item && item.description, 2000)
      };
    });
    if (restored.length) experienceEntries = restored;
    return;
  }

  // Older drafts had one free-text "experience" box.
  if (typeof draft.experience === "string" && draft.experience.trim()) {
    experienceEntries = [{ ...blankExperience(), description: cleanText(draft.experience, 2000) }];
  }
}

function formatDate(month, year) {
  if (!year) return "";
  return month ? `${MONTH_NAMES[Number(month) - 1]} ${year}` : String(year);
}

function jobDuration(entry) {
  if (!entry.startYear || !entry.startMonth) return "";

  const start = Number(entry.startYear) * 12 + Number(entry.startMonth) - 1;
  let end;
  if (entry.current) {
    const now = new Date();
    end = now.getFullYear() * 12 + now.getMonth();
  } else if (entry.endYear && entry.endMonth) {
    end = Number(entry.endYear) * 12 + Number(entry.endMonth) - 1;
  } else {
    return "";
  }

  const months = end - start + 1;
  if (months < 1) return "";

  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
}

// Returns a message if any job ends before it starts.
function experienceDateProblem() {
  for (let i = 0; i < experienceEntries.length; i++) {
    const entry = experienceEntries[i];
    if (entry.current || !entry.startYear || !entry.endYear) continue;

    const start = Number(entry.startYear) * 12 + Number(entry.startMonth || 1);
    const end = Number(entry.endYear) * 12 + Number(entry.endMonth || 12);
    if (end < start) {
      return `Job ${i + 1}: the end date is before the start date. Please check the years.`;
    }
  }
  return "";
}

// ---------- LinkedIn ----------

// Accepts "linkedin.com/in/name" or a full URL. Returns null if it isn't LinkedIn.
function normalizeLinkedIn(value) {
  if (!value) return null;

  let candidate = value.trim();
  if (!/^https?:\/\//i.test(candidate)) candidate = "https://" + candidate;

  try {
    const url = new URL(candidate);
    const host = url.hostname.toLowerCase();
    const isLinkedIn = host === "linkedin.com" || host.endsWith(".linkedin.com");
    if (!isLinkedIn || url.pathname.length < 2) return null;

    url.protocol = "https:";
    url.search = "";
    url.hash = "";

    return {
      href: url.href,
      text: (host.replace(/^www\./, "") + url.pathname).replace(/\/$/, "")
    };
  } catch (error) {
    return null;
  }
}

// ---------- Photo (passport-size square with a crop box) ----------

function setPhoto(dataUrl) {
  photoData = dataUrl;

  if (dataUrl) {
    photoPreview.style.backgroundImage = `url("${dataUrl}")`;
    photoPreview.textContent = "";
    photoPreview.classList.add("has-photo");
    photoButton.textContent = "Change photo";
  } else {
    photoPreview.style.backgroundImage = "";
    photoPreview.textContent = "No photo";
    photoPreview.classList.remove("has-photo");
    photoButton.textContent = "Upload photo";
  }

  removePhotoButton.hidden = !dataUrl;
}

const crop = { image: null, zoom: 1, base: 1, offX: 0, offY: 0, dragging: false, lastX: 0, lastY: 0 };

function cropGeometry() {
  const scale = crop.base * crop.zoom;
  const width = crop.image.width * scale;
  const height = crop.image.height * scale;
  return {
    width,
    height,
    maxX: Math.max(0, (width - CROP_VIEW) / 2),
    maxY: Math.max(0, (height - CROP_VIEW) / 2)
  };
}

function clampCrop() {
  const g = cropGeometry();
  crop.offX = Math.min(g.maxX, Math.max(-g.maxX, crop.offX));
  crop.offY = Math.min(g.maxY, Math.max(-g.maxY, crop.offY));
}

// Draws the photo into a canvas context, scaled by k. With guide=true it also
// dims the area outside a face oval to help the person frame the shot.
function paintCrop(context, k, guide) {
  const g = cropGeometry();
  const x = CROP_VIEW / 2 - g.width / 2 + crop.offX;
  const y = CROP_VIEW / 2 - g.height / 2 + crop.offY;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, CROP_VIEW * k, CROP_VIEW * k);
  context.drawImage(crop.image, x * k, y * k, g.width * k, g.height * k);

  if (!guide) return;

  const cx = CROP_VIEW / 2;
  const cy = CROP_VIEW * 0.45;
  const rx = CROP_VIEW * 0.24;
  const ry = CROP_VIEW * 0.33;

  context.save();
  context.beginPath();
  context.rect(0, 0, CROP_VIEW, CROP_VIEW);
  context.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  context.fillStyle = "rgba(0, 0, 0, 0.28)";
  context.fill("evenodd");

  context.beginPath();
  context.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  context.lineWidth = 3;
  context.strokeStyle = "rgba(0, 0, 0, 0.45)";
  context.stroke();
  context.lineWidth = 1.5;
  context.setLineDash([6, 5]);
  context.strokeStyle = "rgba(255, 255, 255, 0.95)";
  context.stroke();
  context.restore();
}

function drawCrop() {
  if (!crop.image) return;
  paintCrop(cropCanvas.getContext("2d"), 1, true);
}

function closeCropper() {
  photoCropper.hidden = true;
  crop.image = null;
  crop.dragging = false;
}

function openCropper(file) {
  photoError.textContent = "";

  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    photoError.textContent = "Please choose a JPG, PNG or WebP image.";
    return;
  }
  if (file.size > MAX_PHOTO_FILE_BYTES) {
    photoError.textContent = "That image is too large. Please choose one under 10 MB.";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const image = new Image();

    image.onload = () => {
      crop.image = image;
      crop.base = Math.max(CROP_VIEW / image.width, CROP_VIEW / image.height);
      crop.zoom = 1;
      crop.offX = 0;
      crop.offY = 0;
      cropZoom.value = "1";

      // Portrait photos: start by showing the upper part, where the face usually is.
      if (image.height > image.width) crop.offY = cropGeometry().maxY * 0.5;
      clampCrop();

      photoCropper.hidden = false;
      drawCrop();
    };

    image.onerror = () => {
      photoError.textContent = "That image couldn't be read. Please try another file.";
    };

    image.src = reader.result;
  };

  reader.onerror = () => {
    photoError.textContent = "That file couldn't be read. Please try again.";
  };

  reader.readAsDataURL(file);
}

cropCanvas.addEventListener("pointerdown", event => {
  if (!crop.image) return;
  crop.dragging = true;
  crop.lastX = event.clientX;
  crop.lastY = event.clientY;
  if (cropCanvas.setPointerCapture) cropCanvas.setPointerCapture(event.pointerId);
});

cropCanvas.addEventListener("pointermove", event => {
  if (!crop.dragging || !crop.image) return;

  const rect = cropCanvas.getBoundingClientRect();
  const factor = rect.width ? CROP_VIEW / rect.width : 1;
  crop.offX += (event.clientX - crop.lastX) * factor;
  crop.offY += (event.clientY - crop.lastY) * factor;
  crop.lastX = event.clientX;
  crop.lastY = event.clientY;

  clampCrop();
  drawCrop();
});

["pointerup", "pointercancel", "pointerleave"].forEach(type => {
  cropCanvas.addEventListener(type, () => { crop.dragging = false; });
});

cropZoom.addEventListener("input", () => {
  if (!crop.image) return;
  crop.zoom = parseFloat(cropZoom.value) || 1;
  clampCrop();
  drawCrop();
});

byId("cropApply").addEventListener("click", () => {
  if (!crop.image) return;

  const canvas = document.createElement("canvas");
  canvas.width = PHOTO_OUTPUT;
  canvas.height = PHOTO_OUTPUT;
  paintCrop(canvas.getContext("2d"), PHOTO_OUTPUT / CROP_VIEW, false);

  setPhoto(canvas.toDataURL("image/jpeg", 0.9));
  closeCropper();
  saveDraft();
});

byId("cropCancel").addEventListener("click", closeCropper);

photoButton.addEventListener("click", () => photoInput.click());

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (file) openCropper(file);
  photoInput.value = ""; // lets the same file be chosen again
});

removePhotoButton.addEventListener("click", () => {
  photoError.textContent = "";
  setPhoto("");
  saveDraft();
});

// ---------- Autosave (browser only; storage can be blocked) ----------

function saveDraft() {
  try {
    const draft = {
      template: selectedTemplate,
      photo: photoData,
      expertise: tagState.expertise,
      certifications: tagState.certifications,
      skills: tagState.skills,
      educationEntries,
      experienceEntries
    };
    FIELD_IDS.forEach(id => {
      draft[id] = byId(id).value;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    // Storage unavailable or full: the app still works.
  }
}

function loadDraft() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const draft = JSON.parse(saved);

    FIELD_IDS.forEach(id => {
      if (typeof draft[id] === "string") byId(id).value = draft[id];
    });

    if (TEMPLATES.includes(draft.template)) selectedTemplate = draft.template;

    restoreEducation(draft);
    restoreExperience(draft);

    if (typeof draft.photo === "string" && draft.photo.startsWith("data:image/")) {
      setPhoto(draft.photo);
    }

    Object.keys(TAG_CONFIG).forEach(kind => {
      const { max, maxLength } = TAG_CONFIG[kind];
      if (Array.isArray(draft[kind])) {
        tagState[kind] = draft[kind]
          .filter(tag => typeof tag === "string" && tag.length <= maxLength)
          .slice(0, max);
      } else if (kind === "skills" && typeof draft.skills === "string") {
        tagState.skills = parseLegacySkills(draft.skills);
      }
      renderTags(kind);
    });
  } catch (error) {
    // Ignore corrupted or unavailable saved data.
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // Nothing to clear.
  }
}

// ---------- Templates ----------

function applyTemplate() {
  templateCards.forEach(card => {
    const isActive = card.dataset.template === selectedTemplate;
    card.classList.toggle("active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });

  resumePreview.className = "resume-paper template-" + selectedTemplate;
}

templateCards.forEach(card => {
  card.addEventListener("click", () => {
    selectedTemplate = card.dataset.template;
    applyTemplate();
    saveDraft();
  });
});

// ---------- Resume generation ----------

function textSection(title, text) {
  return `
    <section>
      <h2>${title}</h2>
      <div class="resume-content">${escapeHTML(text)}</div>
    </section>
  `;
}

function htmlSection(title, html) {
  return `
    <section>
      <h2>${title}</h2>
      ${html}
    </section>
  `;
}

function renderResume() {
  const fullName = getValue("fullName");
  const jobTitle = getValue("jobTitle");
  const email = getValue("email");
  const phone = getValue("phone");
  const location = getValue("location");
  const summary = getValue("summary");
  const awards = getValue("awards");

  // LinkedIn must be a real LinkedIn address, or be left empty.
  const linkedinRaw = getValue("linkedin");
  const linkedin = normalizeLinkedIn(linkedinRaw);
  if (linkedinRaw && !linkedin) {
    linkedinError.textContent = "Please enter a LinkedIn address like linkedin.com/in/your-name";
    byId("linkedin").focus();
    return;
  }
  linkedinError.textContent = "";

  const dateProblem = experienceDateProblem();
  byId("experienceError").textContent = dateProblem;
  if (dateProblem) {
    byId("experienceEntries").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const contactParts = [email, phone, location].filter(Boolean).map(escapeHTML);
  if (linkedin) {
    contactParts.push(
      `<a href="${escapeHTML(linkedin.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(linkedin.text)}</a>`
    );
  }
  const contact = contactParts.join(" &nbsp;|&nbsp; ");

  const sections = [];
  if (summary) sections.push(textSection("Professional Summary", summary));

  if (tagState.expertise.length) {
    const tags = tagState.expertise.map(tag => `<span>${escapeHTML(tag)}</span>`).join("");
    sections.push(htmlSection("Areas of Expertise", `<div class="resume-tags">${tags}</div>`));
  }

  // Work experience: one block per company
  const jobsHTML = experienceEntries
    .map(entry => {
      const company = entry.company.trim();
      const title = entry.title.trim();
      const description = entry.description.trim().replace(/^[-*]\s+/gm, "\u2022 ");

      const start = formatDate(entry.startMonth, entry.startYear);
      const end = entry.current ? "Present" : formatDate(entry.endMonth, entry.endYear);
      const dates = start && end ? `${start} \u2013 ${end}` : start || end;
      const duration = jobDuration(entry);

      const heading = title || company;
      if (!heading && !dates && !description) return "";

      const subline = [title ? company : "", duration].filter(Boolean).join(" \u00b7 ");

      return `<div class="resume-job">
        ${heading || dates ? `<div class="job-head">${heading ? `<strong>${escapeHTML(heading)}</strong>` : "<span></span>"}${dates ? `<span class="job-dates">${escapeHTML(dates)}</span>` : ""}</div>` : ""}
        ${subline ? `<div class="job-company">${escapeHTML(subline)}</div>` : ""}
        ${description ? `<div class="resume-content">${escapeHTML(description)}</div>` : ""}
      </div>`;
    })
    .join("");
  if (jobsHTML) sections.push(htmlSection("Work Experience", jobsHTML));

  // Education: one block per qualification
  const educationHTML = educationEntries
    .map(entry => {
      const heading = [entry.degree.trim(), entry.specialization.trim()].filter(Boolean).join(" \u2013 ");
      const place = [entry.college.trim(), entry.year.trim()].filter(Boolean).join(" \u00b7 ");
      if (!heading && !place) return "";
      return `<div class="resume-edu">${heading ? `<strong>${escapeHTML(heading)}</strong>` : ""}${place ? `<span>${escapeHTML(place)}</span>` : ""}</div>`;
    })
    .join("");
  if (educationHTML) sections.push(htmlSection("Education", educationHTML));

  if (tagState.skills.length) {
    const skills = tagState.skills.map(skill => escapeHTML(skill)).join(" \u2022 ");
    sections.push(htmlSection("Skills", `<div class="resume-content">${skills}</div>`));
  }

  if (tagState.certifications.length) {
    const items = tagState.certifications.map(tag => `<li>${escapeHTML(tag)}</li>`).join("");
    sections.push(htmlSection("Certifications", `<ul class="resume-list">${items}</ul>`));
  }

  // One award per line; leading bullets or dashes are ignored.
  const awardItems = awards
    .split(/\n+/)
    .map(line => line.replace(/^[\s\u2022\-\u2013*]+/, "").trim())
    .filter(Boolean);
  if (awardItems.length) {
    const items = awardItems.map(item => `<li>${escapeHTML(item)}</li>`).join("");
    sections.push(htmlSection("Awards &amp; Recognition", `<ul class="resume-list">${items}</ul>`));
  }

  const photoHTML = photoData
    ? `<img class="resume-photo" src="${escapeHTML(photoData)}" alt="Photo of ${escapeHTML(fullName)}">`
    : "";

  resumePreview.innerHTML = `
    <header class="resume-header">
      <div class="resume-header-text">
        <h1>${escapeHTML(fullName)}</h1>
        ${jobTitle ? `<p><strong>${escapeHTML(jobTitle)}</strong></p>` : ""}
        ${contact ? `<p>${contact}</p>` : ""}
      </div>
      ${photoHTML}
    </header>
    ${sections.join("")}
  `;

  applyTemplate();
  resumeOutput.hidden = false;
  resumeOutput.scrollIntoView({ behavior: "smooth", block: "start" });
}

resumeForm.addEventListener("submit", event => {
  event.preventDefault();
  saveDraft();
  renderResume();
});

resumeForm.addEventListener("input", saveDraft);

// Pressing Enter inside a text box should not generate the resume by accident.
resumeForm.addEventListener("keydown", event => {
  if (event.key === "Enter" && event.target.tagName === "INPUT" &&
      event.target.type !== "submit" && event.target.type !== "button") {
    event.preventDefault();
  }
});

clearButton.addEventListener("click", () => {
  if (!confirm("Clear all fields and remove the saved draft?")) return;

  resumeForm.reset();
  setPhoto("");
  closeCropper();
  photoError.textContent = "";
  linkedinError.textContent = "";
  Object.keys(TAG_CONFIG).forEach(kind => {
    tagState[kind] = [];
    byId(kind + "Error").textContent = "";
    renderTags(kind);
  });
  educationEntries = [blankEducation()];
  experienceEntries = [blankExperience()];
  renderEducation();
  renderExperience();
  clearDraft();
  resumePreview.innerHTML = "";
  resumeOutput.hidden = true;
});

printButton.addEventListener("click", () => window.print());

// ---------- Mobile menu ----------

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Share, feedback and privacy ----------

const shareStatus = byId("shareStatus");

function siteUrl() {
  const canonical = document.querySelector('link[rel="canonical"]');
  return canonical && canonical.href ? canonical.href : window.location.origin + window.location.pathname;
}

const SHARE_TEXT = "Free resume builder for students and job seekers. No sign-up needed:";

function showShareStatus(message) {
  shareStatus.textContent = message;
  setTimeout(() => { shareStatus.textContent = ""; }, 3500);
}

byId("shareWhatsApp").href = "https://wa.me/?text=" + encodeURIComponent(SHARE_TEXT + " " + siteUrl());
byId("shareLinkedIn").href = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(siteUrl());

// The phone's own share sheet, where the browser supports it
if (typeof navigator.share === "function") {
  const nativeButton = byId("shareNative");
  nativeButton.hidden = false;
  nativeButton.addEventListener("click", () => {
    navigator.share({ title: "BC CareerCraft", text: SHARE_TEXT, url: siteUrl() }).catch(() => {
      // The person closed the share sheet; nothing to do.
    });
  });
}

byId("copyLink").addEventListener("click", async () => {
  const url = siteUrl();
  try {
    await navigator.clipboard.writeText(url);
    showShareStatus("Link copied. Paste it anywhere to share.");
  } catch (error) {
    // Older browsers: copy through a temporary text box.
    const box = document.createElement("textarea");
    box.value = url;
    box.setAttribute("readonly", "");
    box.style.position = "fixed";
    box.style.opacity = "0";
    document.body.appendChild(box);
    box.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } catch (copyError) { copied = false; }
    document.body.removeChild(box);
    showShareStatus(copied ? "Link copied. Paste it anywhere to share." : "Could not copy. Please copy the address from the browser bar.");
  }
});

// Feedback link: a Google Form (preferred) or an email address, set in data.js
(function setupFeedback() {
  if (typeof SITE_CONFIG === "undefined") return;
  const link = byId("feedbackLink");
  const formUrl = String(SITE_CONFIG.feedbackUrl || "").trim();
  const email = String(SITE_CONFIG.feedbackEmail || "").trim();

  if (/^https:\/\/\S+$/i.test(formUrl)) {
    link.href = formUrl;
    link.hidden = false;
  } else if (/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    link.href = "mailto:" + email + "?subject=" + encodeURIComponent("BC CareerCraft feedback");
    link.removeAttribute("target");
    link.hidden = false;
  }
})();

// ---------- Install as an app (PWA) ----------

let installPrompt = null;
const installButton = byId("installApp");

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault(); // we show our own button instead of the browser's banner
  installPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  try {
    await installPrompt.userChoice;
  } catch (error) {
    // The person closed the prompt.
  }
  installPrompt = null;
  installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installPrompt = null;
  installButton.hidden = true;
  showShareStatus("Installed. You can open BC CareerCraft from your home screen.");
});

// Works offline after the first visit (only on a real web address, not a local file)
if ("serviceWorker" in navigator && /^https?:$/.test(window.location.protocol)) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      // The site still works normally without offline support.
    });
  });
}

// ---------- Start ----------

loadDraft();
renderEducation();
renderExperience();
applyTemplate();
