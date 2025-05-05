
function copyString(targetId) {
    const textElem = document.getElementById(targetId);
    if (textElem) {
        const text = textElem.textContent || textElem.innerText;
        navigator.clipboard.writeText(text);
    }
}

const wrapper = document.querySelector('.wrapper');
let timeoutId;
wrapper.addEventListener('scroll', function() {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(function() {
        const scrollPos = wrapper.scrollTop;
        console.log('scrollPos');
       
        if (scrollPos >= 10 && scrollPos <= 600) {
            wrapper.scrollTo({
                top: 150, 
                behavior: 'smooth'
            });
        }
    }, 200); 
});

function filterSelection(category) {
    const items = document.querySelectorAll('.porjects .link');
    
    items.forEach(item => {
        if (category === 'all') {
            item.classList.remove('hidden');
        } else {
            if (item.classList.contains(category)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
    });

    const filter = document.querySelectorAll('.filter button');

    filter.forEach(item => {
        if (item.classList.contains(category)) {
            item.classList.add('bg-white', 'text-black', 'font-bold');
        } else {
            item.classList.remove('bg-white', 'text-black', 'font-bold');
        }   
        
    });
}

filterSelection('all');

let num = 0;
function Carousel(add) {
    const items = document.querySelectorAll('.carousel .picture');

    num += Number(add);

    if (num > items.length) {
        num = 1;
        console.log('made small');
      } else if (num < 1) {
        num = items.length; 
      }

      items.forEach(item => {
        if (item.classList.contains(num.toString())) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
      console.log(num);
}
Carousel(1);

/*
var num2 = 0;
function Carousel2(add) {
    const items = document.querySelectorAll('.porjects .picture');
        if (item.classList.contains(num)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
      
    };

    const filter = document.querySelectorAll('.filter button');

    filter.forEach(item => {
        if (item.classList.contains(category)) {
            item.classList.add('bg-white', 'text-black', 'font-bold');
        } else {
            item.classList.remove('bg-white', 'text-black', 'font-bold');
        }   
        
    });
}
Carousel2('1');
*/