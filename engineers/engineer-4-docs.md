# تعليمات المهندس 4 (التوثيق)

## بيانات المهندس
- الاسم: محمود هنداوي
- الدور: التوثيق
- تاريخ البدء: [اكتب التاريخ]

## الهدف
توثيق كامل للمشروع مع صور Jira وخطوات Git والتشغيل.

## الفرع المقترح
`docs/project-documentation`

## المهام المطلوبة
1) تحديث `README.md`:
   - فكرة المشروع
   - أسماء الفريق والأدوار
   - طريقة التشغيل (Local Storage)
2) تعبئة `DOCS.md` بالكامل:
   - مراحل التنفيذ
   - تقسيم المهام
   - خطة العمل
   - صور من Jira
   - آلية العمل باستخدام Git
3) توثيق خطوات Jira وإضافة لقطات الشاشة.

## الكود الذي يجب رفعه
- `README.md`
- `DOCS.md`
- أي صور Jira (إن تم حفظها)

## خطوات الرفع كاملة
```text
git clone https://github.com/alasermohamad94/library_management.git
cd library_management
git checkout -b docs/project-documentation
git add README.md DOCS.md
git commit -m "Update project documentation"
git push -u origin docs/project-documentation
```
ثم افتح Pull Request على `main`.

## خطوات العمل التفصيلية
1) استلم رابط المستودع من قائد الفريق.
   - إذا كان لديك نسخة قديمة، احذفها وأعد clone من المستودع الجديد.
2) نفّذ clone وانتقل للمجلد.
3) أنشئ فرع التوثيق.
4) حدّث `README.md` و `DOCS.md`.
5) Commit واضح ثم Push.
6) افتح Pull Request مع شرح موجز.
7) أضف رابط الـ PR داخل مهمة Jira الخاصة بك.

## مخرجات إثبات العمل
- رابط Pull Request.
- صور Jira مضافة داخل `DOCS.md`.
