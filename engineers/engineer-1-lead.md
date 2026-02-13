# تعليمات المهندس 1 (قائد الفريق)

## بيانات المهندس
- الاسم: محمد حمدان
- الدور: قائد الفريق
- تاريخ البدء: [اكتب التاريخ]

## الهدف
إدارة الريبو وضمان التزام الفريق بالـ Git/GitHub وتنسيق الدمج والتوثيق.

## الفرع المقترح
`setup/project-structure`

## المهام المطلوبة
1) إنشاء Repository خاص على GitHub وإضافة جميع الأعضاء كـ Collaborators.
2) رفع الهيكل فقط (بدون كود المشروع) ليتضح عمل كل عضو.
3) إعداد Jira للمشروع (انظر `JIRA_SETUP.md`).
4) تفعيل العمل بالـ Pull Requests فقط.
5) مراجعة PRs من الأعضاء وكتابة ملاحظات.
6) تحديث الروابط في `README.md` و `DOCS.md`.

## الكود الذي يجب رفعه
- الهيكل فقط:
  - `README.md`
  - `SETUP_GIT.md`
  - `JIRA_SETUP.md`
  - مجلد `engineers/`

## خطوات الرفع كاملة (مختصرة)
```text
git init
git add README.md SETUP_GIT.md JIRA_SETUP.md engineers/
git commit -m "Init repo structure and team instructions"
git branch -M main
git remote add origin https://github.com/alasermohamad94/library_management.git
git push -u origin main
```

## خطوات العمل التفصيلية (قائد الفريق)
1) أنشئ المستودع على GitHub باسم `library_management` وحدده كـ Private.
2) أضف جميع أعضاء الفريق كـ Collaborators.
3) من داخل مجلد المشروع:
   - نفّذ أوامر الرفع السابقة (هيكل فقط).
4) راجع أن الملفات الأساسية ظهرت على GitHub.
5) نفّذ خطوات Jira من الملف `JIRA_SETUP.md`.
6) فعّل سياسات PR إن أمكن.
7) استقبل PRs من الأعضاء وراجعها ثم دمجها.

## خطوات العمل بعد ذلك
1) إنشاء فرع جديد لأي تعديل.
2) Commit واضح.
3) Push ثم فتح Pull Request.
4) مراجعة ودمج.

## مخرجات إثبات العمل
- رابط PR رئيسي أو رابط الريبو.
- 2–3 Commits واضحة باسمك.
- تحديث روابط `README.md`.
