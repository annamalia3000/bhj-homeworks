const tips = document.querySelectorAll('.has-tooltip');

tips.forEach(tip => {
    tip.addEventListener('click', e => {
        e.preventDefault(); 

        let tooltip = tip.nextElementSibling;
        if (!tooltip || !tooltip.classList.contains('tooltip')) {
            tip.insertAdjacentHTML('afterEnd', `<div class="tooltip" data-position="top">${tip.getAttribute('title')}</div>`);
            tooltip = tip.nextElementSibling;
        }

        tooltip.classList.toggle('tooltip_active');

        document.addEventListener('click', function closeTooltip(event) {
            if (!tooltip.contains(event.target) && event.target !== tip) {
                tooltip.remove(); 
                document.removeEventListener('click', closeTooltip); 
            }
        });
    });
});

//не показываются подсказки у последних двух элементов(в html строки добавляются)
//как правильно реализовать позиционирование 