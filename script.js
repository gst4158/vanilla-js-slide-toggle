// Instance variable for timeout function name
let toggleElementTimeout;

/**
 * Get elements height even if its hidden/display none
 * @param {Object} element DOM element to get height from
 */
function getElementHeight(element) {
  const clone = element.cloneNode(true);
  const buffer = 16;
  Object.assign(clone.style, {
    overflow: 'visible',
    height: 'auto',
    maxHeight: 'none',
    opacity: '0',
    visibility: 'hidden',
    display: 'block',
  });
  
  element.after(clone);
  const height = clone.offsetHeight;

  clone.remove();
  return height + buffer;
} 

/**
 * Allows CSS transition to slide toggle element height
 * @param {Object} element DOM element to toggle
 * @param {Object} elementTrigger Trigger which started toggle action. ADA is updated as part of process
 */
function toggleElm(element, elementTrigger) {
  if (element) {
    const nameSpace = 'toggle-element';
    const activeClass = `${nameSpace}--active`;
    const hiddenClass = `${nameSpace}--hidden`;
    
    // Get transition timers from CSS
    const buffer = 100;
    const transitionTimer = Number(
      (
        window.getComputedStyle(element).getPropertyValue('transition-duration')
          ? window.getComputedStyle(element).getPropertyValue('transition-duration').replace('s', '')
          : 300
      ) * 1000
    );
    
    const containerH = `${getElementHeight}px`;
    
    // Clear timeout
    window.clearTimeout(toggleElementTimeout);
    
    // Show layer
    if (element.classList.contains(hiddenClass)) {
      element.classList.remove(hiddenClass);
      element.classList.add(activeClass);
      if (elementTrigger) elementTrigger.setAttribute('aria-expand', 'true');
      
      setTimeout(() => {
        element.style.height = containerH;
      }, 0);
      
      toggleElementTimeout = window.setTimeout(() => {
        element.style.height = 'auto';
      }, transitionTimer + buffer);
    }
    // Hide layer
    else {
      element.style.height = containerH;
      element.classList.remove(activeClass);
      if (elementTrigger) elementTrigger.setAttribute('aria-expand', 'false');
      
      setTimeout(() => {
        element.style.height = '0px;
      }, 0);
      
      toggleElementTimeout = window.setTimeout(() => {
        element.classList.add(hiddenClass);
        element.style.height = '';
      }, transitionTimer + buffer);
    }
  }
}
