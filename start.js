document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('id-input');
    const btn = document.getElementById('verify-btn');
    const msg = document.getElementById('msg-box');
    const loader = document.getElementById('loader');

    // قائمة الـ IDs المسموح بها (أضف أرقامك هنا)
    const WHITELIST = [
        "1528434705",
        "1528439451",
        "1528468559",
        "1528509263",
    ];

    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9]/g, ''); // يقبل كل الأرقام 0-9
        msg.style.display = 'none';
    });

    btn.addEventListener('click', () => {
        const val = input.value.trim();
        if (val.length !== 9 && val.length !== 10) {
            msg.textContent = "يجب إدخال 9 أو 10 رقماً";
            msg.style.display = 'block';
            return;
        }

        btn.style.display = 'none';
        loader.style.display = 'block';

        setTimeout(() => {
            if (WHITELIST.includes(val)) {
                localStorage.setItem('vinis_user', val);
                window.location.href = "results.html";
            } else {
                loader.style.display = 'none';
                btn.style.display = 'block';
                msg.textContent = "هذا الـ ID غير مصرح له";
                msg.style.display = 'block';
            }
        }, 1500);
    });

});




