import React from 'react'

// You can style this however you want.
// This is a simple example of a centered spinner.
const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: '#f8f8f8',
  },
  spinner: {
    border: '8px solid #f3f3f3' /* Light grey */,
    borderTop: '8px solid #3498db' /* Blue */,
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
  },
  // Keyframes need to be added to globals.css
}

export default function GlobalLoader() {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
    </div>
  )
}
