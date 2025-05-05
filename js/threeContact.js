import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';



const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#three'),
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 10;

const geometry = new THREE.DodecahedronGeometry(2, 1);
const material3 = new THREE.MeshStandardMaterial( {color: 0xffffff, wireframe: true, linewidth: 4} );
const mesh1 = new THREE.Mesh( geometry, material3);


const material = new THREE.MeshStandardMaterial( { color: 0xffffff, flatShading: true} );
const material2 = new THREE.MeshStandardMaterial( {color: 0x777777, linewidth: 1,} ); 
const material4 = new THREE.MeshToonMaterial( { color: 0xffffff, flatShading: true} );

mesh1.translateZ(7);
mesh1.translateX(-2);
mesh1.rotateZ(0.7);

scene.add( mesh1 );


const geometry2 = new THREE.BoxGeometry( 200, 3, 1 );

const mesh2 = new THREE.Mesh( geometry2, material3 );
mesh2.translateZ(2);
mesh2.rotateZ(0.7);
mesh2.rotateX(-0.8);
mesh2.rotateX(-0.8);
scene.add( mesh2 );

function animate() {
	mesh1.rotation.x += -0.001;
	mesh1.rotation.y += -0.002;
	mesh1.rotation.z += -0.001;
	
	renderer.render(scene, camera);
}


const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
scene.add( hemiLight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(30, -10, 20);
scene.add( directionalLight );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.castShadow = true;
spotLight.position.set( 2, 0, 10 );
scene.add( spotLight );

const controls = new OrbitControls(camera, renderer.domElement);

//Ein EventListener der darauf achtet das bem Resizen des Fensters die aspectRatio auch akktualisiert wird. 
//Ohne macht das Probleme und funktioniert erst richtig wenn man Refreshed
window.addEventListener('resize', resetWindowRatio);
window.addEventListener('', changeColour);
var activeColor = 0xffffff;


var mouseColor = 0x00ff00;
function changeColour() {
	changeColour1();
	changeColour2();
};
window.changeColour = changeColour;

function changeColour1() { 
    const rTarget = Math.floor(Math.random() * 256);
    const gTarget = Math.floor(Math.random() * 256);
    const bTarget = Math.floor(Math.random() * 256);

    const currentColor = hemiLight.color;
    const rCurrent = Math.round(currentColor.r * 255);
    const gCurrent = Math.round(currentColor.g * 255);
    const bCurrent = Math.round(currentColor.b * 255);

    const duration = 1000;
    const startTime = performance.now();
 
    function animateColorTransition(now) {
        const elapsedTime = now - startTime;
        const progress = Math.min(elapsedTime / duration, 1); 

        const rNew = Math.round(rCurrent + (rTarget - rCurrent) * progress);
        const gNew = Math.round(gCurrent + (gTarget - gCurrent) * progress);
        const bNew = Math.round(bCurrent + (bTarget - bCurrent) * progress);

        hemiLight.color.setRGB(rNew / 255, gNew / 255, bNew / 255);
       
        mouseColor = `#${rNew.toString(16).padStart(2, '0')}${gNew.toString(16).padStart(2, '0')}${bNew.toString(16).padStart(2, '0')}`;
        //console.log(mouseColor);
        mouseCircle.style.borderColor = mouseColor;
        
        

        if (progress < 1) {
            requestAnimationFrame(animateColorTransition); 
        }
    }

    requestAnimationFrame(animateColorTransition);
};

function changeColour2() { 
    const rTarget = Math.floor(Math.random() * 256);
    const gTarget = Math.floor(Math.random() * 256);
    const bTarget = Math.floor(Math.random() * 256);

    const currentColor = directionalLight.color;
    const rCurrent = Math.round(currentColor.r * 255);
    const gCurrent = Math.round(currentColor.g * 255);
    const bCurrent = Math.round(currentColor.b * 255);

    const duration = 1000;
    const startTime = performance.now();

    function animateColorTransition(now) {
        const elapsedTime = now - startTime;
        const progress = Math.min(elapsedTime / duration, 1); 

        const rNew = Math.round(rCurrent + (rTarget - rCurrent) * progress);
        const gNew = Math.round(gCurrent + (gTarget - gCurrent) * progress);
        const bNew = Math.round(bCurrent + (bTarget - bCurrent) * progress);

        directionalLight.color.setRGB(rNew / 255, gNew / 255, bNew / 255);

        if (progress < 1) {
            requestAnimationFrame(animateColorTransition);
        }
    }

    requestAnimationFrame(animateColorTransition); 
};


function repositionLight() { 
    const xPre = Math.floor(Math.random() * 5);
	const xIsNegative = Math.random() < 0.5; 
	const xTarget = xIsNegative ? -xPre : xPre;

	const yPre = Math.floor(Math.random() * 5);
	const yIsNegative = Math.random() < 0.5; 
	const yTarget = yIsNegative ? -yPre : yPre;
	
	const zPre = Math.floor(Math.random() * 2);
	const zIsNegative = Math.random() < 0.5; 
	const zTarget = zIsNegative ? -zPre : zPre;

    const xCurrent = directionalLight.position.x;
	const yCurrent = directionalLight.position.y;
	const zCurrent = directionalLight.position.z;

    const duration = 1000;
    const startTime = performance.now();

    function animateTransition(now) {
        const elapsedTime = now - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const xNew = Math.round(xCurrent + (xTarget - xCurrent) * progress);
        const yNew = Math.round(yCurrent + (yTarget - yCurrent) * progress);
        const zNew = Math.round(zCurrent + (zTarget - zCurrent) * progress);

        directionalLight.position.set(xNew, yNew, zNew);

        if (progress < 1) {
            requestAnimationFrame(animateTransition);
        }
    }

    requestAnimationFrame(animateTransition); 
};
window.repositionLight = repositionLight;

//Erkennt einen unterschied zwischen hoch und herunterscrollen
var prevScroll = 0;
var newScrollTop = 0;
window.onscroll = function() {
	newScrollTop = window.scrollY;
	if (newScrollTop < prevScroll) {
		moveUp();
		console.log('Scrolling Up');
	} else {
		moveDown();
		console.log('Scrolling Down');
	}
	prevScroll = window.scrollY;
	console.log(window.scrollY);
  };

function moveUp() {
	const t = document.body.getBoundingClientRect().top;
	mesh1.position.z = window.scrollY/100;
}

function moveDown() {
	const t = document.body.getBoundingClientRect().top;
	mesh1.position.z = window.scrollY/100;;
}

var mouseCircle = document.querySelector('#mouseCircle');
var page = document.querySelector('#page');

page.onmousemove = (event) => {
    var x = (event.clientX - mouseCircle.offsetWidth / 2) * 100 / window.innerWidth + "%";
    var y = (event.clientY - mouseCircle.offsetHeight / 2) * 100 / window.innerHeight + "%";
    mouseCircle.style.left = x;
    mouseCircle.style.top = y;
}


/*
var linkButton = document.querySelector('#linkButton');

linkButton.addEventListener('mouseenter', () => {
    makeCircleSmaller();
});

linkButton.addEventListener('mouseleave', () => {
    resetCircleSize();
});

function makeCircleSmaller2() {
    mouseCircle.classList.remove('w-12', 'h-12');
    mouseCircle.classList.add('w-6', 'h-6');
}

function resetCircleSize2() {
    mouseCircle.classList.remove('w-6', 'h-6');
    mouseCircle.classList.add('w-12', 'h-12');
}
 */

//HoverEffect for Mouse Circle



document.querySelectorAll('.hoverEffect').forEach(element => {
    element.addEventListener('mouseenter', () => {
        mouseCircle.classList.remove('scale-100', 'border-2');
        mouseCircle.classList.add('scale-[0.35]', 'border-8');
    });

    element.addEventListener('mouseleave', () => {
        mouseCircle.classList.remove('scale-[0.35]', 'border-8');
        mouseCircle.classList.add('scale-100', 'border-2');
    });
});


function makeCircleSmaller() {
    mouseCircle.classList.remove('scale-100', 'border-2');
    mouseCircle.classList.add('scale-[0.35]', 'border-8');
}

function resetCircleSize() {
    mouseCircle.classList.remove('scale-[0.35]', 'border-8');
    mouseCircle.classList.add('scale-100', 'border-2');
}

//Generall Use
function resetWindowRatio(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

animate();

changeColour();