document.addEventListener('DOMContentLoaded', () => {
    const gridBoard = document.getElementById('grid-board');
    const multipliersContainer = document.getElementById('multipliers');
    const predictBtn = document.getElementById('predict-btn');
    const resetBtn = document.getElementById('reset-btn');
    const modal = document.getElementById('loading-modal');
    const statusText = document.getElementById('status-text');

    // زدنا الرقم 349.6 فـ الأول ديال القائمة
    const MULTIPLIERS = ["349.6", "69.9", "27.9", "11.1", "6.7", "4.0", "2.4", "1.9", "1.5", "1.2"];
    
    document.getElementById('display-id').textContent = localStorage.getItem('vinis_user') || "Unknown";

    function init() {
        gridBoard.innerHTML = ''; 
        multipliersContainer.innerHTML = '';
        
        MULTIPLIERS.forEach(m => {
            const div = document.createElement('div'); 
            div.className = 'm-cell'; 
            div.textContent = 'x' + m; // زيادة حرف x للتنسيق
            multipliersContainer.appendChild(div);
        });

        // رديناها 50 خلية (10 صفوف × 5 أعمدة)
        for (let i = 0; i < 50; i++) {
            const div = document.createElement('div'); 
            div.className = 'cell';
            gridBoard.appendChild(div);
        }
    }

    predictBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        predictBtn.disabled = true;

        setTimeout(() => {
            modal.style.display = 'none';
            statusText.textContent = "تم استخراج المسار الآمن بنجاح ✅";
            
            const cells = document.querySelectorAll('.cell');
            const mCells = document.querySelectorAll('.m-cell');
            
            let delayTime = 0;
            // دابا الحساب غادي يبدا من الصف 9 (العاشر) ويطلع للفوق
            for (let row = 9; row >= 0; row--) {
                setTimeout(() => {
                    const randomCol = Math.floor(Math.random() * 5);
                    const targetCell = cells[row * 5 + randomCol];
                    
                    targetCell.classList.add('safe');
                    targetCell.innerHTML = '🍏';
                    mCells[row].classList.add('active');
                    
                }, delayTime);
                delayTime += 200; 
            }
        }, 2000); 
    });

    resetBtn.addEventListener('click', () => { 
        init(); 
        predictBtn.disabled = false; 
        statusText.textContent = "جاهز لتحليل جديد";
    });

    init();
});