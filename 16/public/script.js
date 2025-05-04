// Add an event listener to pause the carousel animation on hover
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    document.querySelector('.carousel').style.animationPlayState = 'paused';
  });
  
  document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    document.querySelector('.carousel').style.animationPlayState = 'running';
  });