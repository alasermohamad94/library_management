const booksBody = document.getElementById("booksBody");
const searchInput = document.getElementById("search");
const messageBox = document.getElementById("message");
const statTotal = document.getElementById("statTotal");
const statAvailable = document.getElementById("statAvailable");
const statBorrowed = document.getElementById("statBorrowed");
const statOps = document.getElementById("statOps");

const STORAGE_KEY = "libraryBooks";
const OPS_KEY = "libraryOpsLog";

const seedBooks = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software",
    available: true,
    borrower: "",
    borrowedAt: "",
    dueAt: ""
  },
  {
    id: 2,
    title: "Introduction to Algorithms",
    author: "Cormen",
    category: "Algorithms",
    available: true,
    borrower: "",
    borrowedAt: "",
    dueAt: ""
  }
];

function loadBooks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedBooks));
    return [...seedBooks];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function logOperation() {
  const today = new Date().toISOString().slice(0, 10);
  const stored = localStorage.getItem(OPS_KEY);
  const logs = stored ? JSON.parse(stored) : {};
  logs[today] = (logs[today] || 0) + 1;
  localStorage.setItem(OPS_KEY, JSON.stringify(logs));
}

function getTodayOps() {
  const today = new Date().toISOString().slice(0, 10);
  const stored = localStorage.getItem(OPS_KEY);
  if (!stored) return 0;
  const logs = JSON.parse(stored);
  return logs[today] || 0;
}

function nextBookId(books) {
  return books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
}

function toISODate(date) {
  return date.toISOString().slice(0, 10);
}

function addMonths(date, months) {
  const d = new Date(date.getTime());
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() !== day) {
    d.setDate(0);
  }
  return d;
}

function formatDate(dateStr) {
  return dateStr ? dateStr : "-";
}

function remainingLabel(book) {
  if (book.available || !book.dueAt) return "-";
  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const due = new Date(book.dueAt + "T00:00:00");
  const diffMs = due.getTime() - todayOnly.getTime();
  const days = Math.ceil(diffMs / 86400000);
  if (days < 0) return `متأخر ${Math.abs(days)} يوم`;
  if (days === 0) return "ينتهي اليوم";
  return `${days} يوم`;
}

function showMessage(text, type = "info") {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
  if (!text) return;
  setTimeout(() => {
    if (messageBox.textContent === text) {
      messageBox.textContent = "";
      messageBox.className = "message";
    }
  }, 2500);
}


function renderBooks(books, query = "") {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      )
    : books;

  booksBody.innerHTML = "";
  filtered.forEach((book) => {
    const row = document.createElement("tr");
    const remaining = remainingLabel(book);
    let remainClass = "due-ok";
    if (remaining.startsWith("متأخر")) remainClass = "overdue";
    if (remaining === "ينتهي اليوم") remainClass = "due-soon";
    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>${book.borrower ? book.borrower : "-"}</td>
      <td>${formatDate(book.borrowedAt)}</td>
      <td>${formatDate(book.dueAt)}</td>
      <td class="${remainClass}">${remaining}</td>
      <td class="${book.available ? "status-available" : "status-borrowed"}">
        ${book.available ? "متاح" : "مستعار"}
      </td>
      <td>
        <div class="table-actions">
          <button class="action-btn" data-action="edit" data-id="${book.id}">
            تعديل
          </button>
          <button class="action-btn danger" data-action="delete" data-id="${book.id}">
            حذف
          </button>
        </div>
      </td>
    `;
    booksBody.appendChild(row);
  });
}

function refresh() {
  const books = loadBooks();
  renderBooks(books, searchInput.value);
  const total = books.length;
  const available = books.filter((b) => b.available).length;
  const borrowed = total - available;
  statTotal.textContent = total;
  statAvailable.textContent = available;
  statBorrowed.textContent = borrowed;
  statOps.textContent = getTodayOps();
}

document.getElementById("refreshBtn").addEventListener("click", refresh);
searchInput.addEventListener("input", refresh);

document.getElementById("addBookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value.trim();
  if (!title || !author) {
    showMessage("يرجى إدخال عنوان ومؤلف للكتاب.", "error");
    return;
  }

  const books = loadBooks();
  books.push({
    id: nextBookId(books),
    title,
    author,
    category: category || "عام",
    available: true,
    borrower: "",
    borrowedAt: "",
    dueAt: ""
  });
  saveBooks(books);
  logOperation();

  e.target.reset();
  showMessage("تمت إضافة الكتاب بنجاح.", "success");
  refresh();
});

document.getElementById("borrowBtn").addEventListener("click", () => {
  const bookId = Number(document.getElementById("loanBookId").value);
  const memberName = document.getElementById("memberName").value.trim();
  if (!bookId || !memberName) {
    showMessage("يرجى إدخال رقم الكتاب واسم العضو.", "error");
    return;
  }

  const books = loadBooks();
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    showMessage("لم يتم العثور على هذا الكتاب.", "error");
    return;
  }
  if (!book.available) {
    showMessage("الكتاب مستعار بالفعل.", "error");
    return;
  }

  book.available = false;
  book.borrower = memberName;
  const today = new Date();
  book.borrowedAt = toISODate(today);
  book.dueAt = toISODate(addMonths(today, 1));
  saveBooks(books);
  logOperation();

  showMessage("تمت عملية الاستعارة بنجاح.", "success");
  refresh();
});

document.getElementById("returnBtn").addEventListener("click", () => {
  const bookId = Number(document.getElementById("loanBookId").value);
  if (!bookId) {
    showMessage("يرجى إدخال رقم الكتاب.", "error");
    return;
  }

  const books = loadBooks();
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    showMessage("لم يتم العثور على هذا الكتاب.", "error");
    return;
  }
  if (book.available) {
    showMessage("الكتاب متاح بالفعل.", "error");
    return;
  }

  book.available = true;
  book.borrower = "";
  book.borrowedAt = "";
  book.dueAt = "";
  saveBooks(books);
  logOperation();

  showMessage("تمت عملية الإرجاع بنجاح.", "success");
  refresh();
});

booksBody.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const action = target.getAttribute("data-action");
  const id = Number(target.getAttribute("data-id"));
  if (!action || !id) return;

  const books = loadBooks();
  const book = books.find((b) => b.id === id);
  if (!book) {
    showMessage("لم يتم العثور على هذا الكتاب.", "error");
    return;
  }

  if (action === "delete") {
    if (!book.available) {
      showMessage("أعد الكتاب أولاً قبل الحذف.", "error");
      return;
    }
    const confirmed = confirm(`هل تريد حذف الكتاب: ${book.title}؟`);
    if (!confirmed) return;
    const updated = books.filter((b) => b.id !== id);
    saveBooks(updated);
    logOperation();
    showMessage("تم حذف الكتاب بنجاح.", "success");
    refresh();
    return;
  }

  if (action === "edit") {
    const newTitle = prompt("عنوان الكتاب:", book.title);
    if (newTitle === null) return;
    const newAuthor = prompt("اسم المؤلف:", book.author);
    if (newAuthor === null) return;
    const newCategory = prompt("التصنيف:", book.category);
    if (newCategory === null) return;
    const newStatus = prompt(
      "الحالة (متاح / مستعار):",
      book.available ? "متاح" : "مستعار"
    );
    if (newStatus === null) return;
    const normalizedStatus = newStatus.trim().toLowerCase();
    const isAvailable =
      normalizedStatus === "متاح" ||
      normalizedStatus === "available" ||
      normalizedStatus === "a";

    let borrowerName = book.borrower;
    let borrowedAt = book.borrowedAt;
    let dueAt = book.dueAt;
    if (!isAvailable) {
      const newBorrower = prompt("اسم المستعير:", book.borrower || "");
      if (newBorrower === null) return;
      borrowerName = newBorrower.trim();
      if (!borrowerName) {
        showMessage("اسم المستعير مطلوب عند حالة مستعار.", "error");
        return;
      }
      const newBorrowedAt = prompt(
        "تاريخ الاستعارة (YYYY-MM-DD):",
        book.borrowedAt || toISODate(new Date())
      );
      if (newBorrowedAt === null) return;
      const newDueAt = prompt(
        "تاريخ الانتهاء (YYYY-MM-DD):",
        book.dueAt || toISODate(addMonths(new Date(), 1))
      );
      if (newDueAt === null) return;
      borrowedAt = newBorrowedAt.trim();
      dueAt = newDueAt.trim();
      if (!borrowedAt || !dueAt) {
        showMessage("تواريخ الاستعارة والانتهاء مطلوبة.", "error");
        return;
      }
    }

    const title = newTitle.trim();
    const author = newAuthor.trim();
    const category = newCategory.trim();
    if (!title || !author) {
      showMessage("العنوان والمؤلف مطلوبان.", "error");
      return;
    }

    book.title = title;
    book.author = author;
    book.category = category || "عام";
    book.available = isAvailable;
    book.borrower = isAvailable ? "" : borrowerName;
    book.borrowedAt = isAvailable ? "" : borrowedAt;
    book.dueAt = isAvailable ? "" : dueAt;
    saveBooks(books);
    logOperation();
    showMessage("تم تحديث بيانات الكتاب.", "success");
    refresh();
  }
});

refresh();
