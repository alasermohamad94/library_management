# إعداد Git/GitHub للمشروع

## خطوات قائد الفريق (مرة واحدة)
1) إنشاء Repository خاص على GitHub باسم `library_management`.
2) إضافة جميع أعضاء الفريق كـ Collaborators.
3) تفعيل العمل عبر Pull Requests فقط (اختياري لكن مستحسن).
4) التأكد من وجود الملفات الأساسية: `README.md`, `DOCS.md`, `TEST_PLAN.md`, `JIRA_SETUP.md` ومجلد `engineers/`.

## خطوات رفع الهيكل فقط (قائد الفريق)
```text
git init
git add README.md SETUP_GIT.md JIRA_SETUP.md engineers/
git commit -m "Init repo structure and team instructions"
git branch -M main
git remote add origin https://github.com/alasermohamad94/library_management.git
git push -u origin main
```

ملاحظة: لا ترفع الكود كاملًا من طرف القائد حتى تظهر مساهمات كل عضو بشكل واضح.

## إعداد Jira
- راجع الملف `JIRA_SETUP.md` ونفّذ الخطوات المذكورة فيه.

## قواعد الفريق
- كل عضو يعمل على فرع خاص به.
- لا يتم العمل مباشرة على `main`.
- كل مهمة تُسلم عبر Pull Request.
- اسم الفرع يكون واضحًا ومعبّرًا عن المهمة.
