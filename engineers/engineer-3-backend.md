# تعليمات المهندس 3 (منطق الأعمال)

## بيانات المهندس
- الاسم: عاصم الرحمون
- الدور: منطق الأعمال
- تاريخ البدء: [اكتب التاريخ]

## الهدف
تطوير منطق النظام داخل الواجهة (Local Storage) ليكون واقعيًا قدر الإمكان.

## الفرع المقترح
`feature/core-logic`

## المهام المطلوبة
1) التأكد من صحة عمليات إضافة/تعديل/حذف الكتاب.
2) إدارة الاستعارة والإرجاع وتواريخها.
3) حساب المدة المتبقية وإظهار المتأخر.
4) إنشاء/تحديث مهمة Jira الخاصة بك وتحريكها حسب الحالة.

## الكود الذي يجب رفعه
- `frontend/app.js`

## خطوات الرفع كاملة
```text
git clone https://github.com/alasermohamad94/library_management.git
cd library_management
git checkout -b feature/core-logic
git add frontend/app.js
git commit -m "Enhance local storage logic"
git push -u origin feature/core-logic
```
ثم افتح Pull Request على `main`.

## خطوات العمل التفصيلية
1) استلم رابط المستودع من قائد الفريق.
   - إذا كان لديك نسخة قديمة، احذفها وأعد clone من المستودع الجديد.
2) نفّذ clone وانتقل للمجلد.
3) أنشئ الفرع الخاص بك.
4) نفّذ التعديلات على `frontend/app.js`.
5) Commit واضح ثم Push.
6) افتح Pull Request ووضح التغيير.
7) أضف رابط الـ PR داخل مهمة Jira الخاصة بك.

## مخرجات إثبات العمل
- رابط Pull Request.
- 2–3 Commits واضحة باسمك.
