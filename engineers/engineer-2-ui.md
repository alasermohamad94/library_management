# تعليمات المهندس 2 (واجهة المستخدم)

## بيانات المهندس
- الاسم: منير الخلف
- الدور: واجهة المستخدم
- تاريخ البدء: [اكتب التاريخ]

## الهدف
تحسين واجهة المشروع (تصميم احترافي، توزيع المحتوى، عرض الجدول).

## الفرع المقترح
`feature/ui-layout`

## المهام المطلوبة
1) ضبط توزيع الصفحة: لوحة الإحصاءات في اليسار والمحتوى في اليمين.
2) تحسين تجربة الجدول والعناوين والأزرار.
3) التأكد من توافق التصميم مع الوضع الداكن.
4) إنشاء/تحديث مهمة Jira الخاصة بك وتحريكها حسب الحالة.

## الكود الذي يجب رفعه
- `frontend/index.html`
- `frontend/styles.css`

## خطوات الرفع كاملة
```text
git clone https://github.com/alasermohamad94/library_management.git
cd library_management
git checkout -b feature/ui-layout
git add frontend/index.html frontend/styles.css
git commit -m "Improve UI layout and styling"
git push -u origin feature/ui-layout
```
ثم افتح Pull Request على `main`.

## خطوات العمل التفصيلية
1) استلم رابط المستودع من قائد الفريق.
   - إذا كان لديك نسخة قديمة، احذفها وأعد clone من المستودع الجديد.
2) نفّذ أوامر الـ clone والانتقال للمجلد.
3) أنشئ الفرع الخاص بك.
4) عدّل ملفات الواجهة المطلوبة.
5) نفّذ commit واضح ثم push.
6) افتح Pull Request واكتب وصفًا قصيرًا للتعديلات.
7) أضف رابط الـ PR داخل مهمة Jira الخاصة بك.

## مخرجات إثبات العمل
- رابط Pull Request.
- لقطات شاشة للواجهة قبل/بعد (في PR أو `DOCS.md`).
