const counterDead = document.getElementById('dead');
const counterLost = document.getElementById('lost');

getHole = index => document.getElementById(`hole${index}`);
let dead = 0;
let lost = 0;

for (let i = 1; i < 10; i++) {
    let hole = getHole(i);
    hole.onclick = () => {
        if (hole.classList.contains('hole_has-mole')) {
            dead++;
            counterDead.textContent = dead; 
        } else {
            lost++;
            counterLost.textContent = lost; 
        };

        if (dead === 10) {
            alert("Победа!");
            location.reload(true);
        };

        if (lost === 5) {
            alert("Вы проиграли!");
            location.reload(true);
        };
    };
}ж