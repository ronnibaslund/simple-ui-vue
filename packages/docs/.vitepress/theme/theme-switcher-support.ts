export function initThemeSwitcher() {
  if (document) {
    const targetNode = document.querySelector('html') as HTMLElement
    setTheme()

    // Options for the observer (which mutations to observe)
    const config = { attributes: true }

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.attributeName === 'class') {
          setTheme()
        }
      }
    }

    function setTheme() {
      // Check for dark mode from VitePress
      const isDark = targetNode.classList.contains('dark')
      
      // Set the appropriate DaisyUI theme
      if (isDark) {
        targetNode.setAttribute('data-theme', 'dark')
        
        // Force refresh DaisyUI CSS variables
        document.documentElement.style.colorScheme = 'dark'
      } else {
        targetNode.setAttribute('data-theme', 'light')
        
        // Force refresh DaisyUI CSS variables
        document.documentElement.style.colorScheme = 'light'
      }
      
      // Add a class to help with debugging
      targetNode.classList.toggle('theme-initialized', true)
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback)

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config)
    
    // Also handle theme changes based on system preference changes
    if (window.matchMedia) {
      const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
      colorSchemeQuery.addEventListener('change', setTheme)
    }
  }
}
