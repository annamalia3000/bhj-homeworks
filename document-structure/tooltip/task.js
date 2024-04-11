document.body.addEventListener('click', event => {
    const tip = event.target.closest('.has-tooltip');

    if (!tip) return;

    event.preventDefault();

    if (tip.classList.contains('tooltip-added')) {
        const tooltip = document.querySelector('.tooltip');
        tooltip.remove();
        tip.classList.remove('tooltip-added');
        return;
    }

    tip.insertAdjacentHTML('afterEnd', `<div class="tooltip">${tip.getAttribute('title')} </div>`);
    const tooltip = document.querySelector('.tooltip');
    tooltip.classList.add('tooltip_active');
    tip.classList.add('tooltip-added');

    function closeTooltip(event) {
        if (!tooltip.contains(event.target) && event.target !== tip) {
            tooltip.remove();
            tip.classList.remove('tooltip-added');
            document.removeEventListener('click', closeTooltip);
        }
    }

    document.addEventListener('click', closeTooltip);
});