document.addEventListener('DOMContentLoaded', function() {
    const timerElement = document.getElementById('timer');
    const contentElement = document.getElementById('content');

    // Устанавливаем целевую дату для Иллинойса (29 марта 00:00 CT = UTC-5)
    const targetDate = new Date('2025-03-29T00:00:00-05:00');
    console.log('Целевая дата:', targetDate.toString()); // Для отладки

    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            timerElement.style.display = 'none';
            contentElement.style.display = 'block';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // Галерея
    document.querySelectorAll('.photo').forEach(photo => {
        photo.addEventListener('click', () => {
            photo.classList.toggle('zoom');
        });
    });
    function createReasonsModal() {
        const modal = document.createElement('div');
        modal.className = 'reasons-modal';

        modal.innerHTML = `
        <div class="reasons-content">
        <div class="close-btn">×</div>
        <div class="reasons-content-inner">
            <h3>21 причина обожать тебя:</h3>
            <ul class="reasons-list">
                ${Array.from({length: 21}, (_, i) => `
                    <li>${i+1}. ${reasonsList[i]}</li>
                `).join('')}
            </ul>
        </div>
    </div>
    `;

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('.close-btn')) {
                modal.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => modal.remove(), 300);
            }
        });

        document.body.appendChild(modal);
        setTimeout(() => modal.style.display = 'flex', 10);
    }

    const reasonsList = [
        'Твое отношение ко мне, твоя любовь',
        'Твой смех, который звучит лучше любой музыки',
        'Твои глаза, в которых я готов потеряться',
        'Твое умение превращать обычный день в праздник',
        'Твоя настойчивость, когда ты чего-то хочешь',
        'Твоя милая картавость',
        'Твоя необычная любовь к кислому',
        'Твоя забота обо мне, даже когда сама устала',
        'Твои учения, касательно романтики',
        'Твое нежное и красивое тело, от которого я безума',
        'Твоя способность найти выход из любой ситуации',
        'Твой прекрасный "самый лучший в мире" носик',
        'Твоя страсть к жизни, которая меня заряжает',
        'То, как ты сопишь тихонько, как котёнок',
        'Твои поиски меня, после внезапного просыпания',
        'Твоя поддержка меня в трудные моменты',
        'Твои шутки, которые смешнее всего на свете',
        'Моменты, когда ты крепко прижимаешь меня к своей груди',
        'Подарки, что ты мне подарила',
        'Твое быстрое засыпание, когда я рядом',
        'Просто потому, что это ТЫ'
    ];

    document.querySelectorAll('.wish-card').forEach(card => {
        if (card.textContent.includes('21 причина')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', createReasonsModal);
        }
    });

    // Оптимизация для тач-устройств
    let isTouchDevice = 'ontouchstart' in window;

    if(isTouchDevice) {
        // Добавляем задержку для hover-эффектов
        document.querySelectorAll('.photo, .wish-card').forEach(el => {
            el.style.transition = 'transform 0.15s ease';
        });

        // Увеличиваем область клика для карточек
        document.querySelectorAll('.wish-card').forEach(card => {
            card.style.userSelect = 'none';
            card.style.webkitTapHighlightColor = 'transparent';
        });
    }
});