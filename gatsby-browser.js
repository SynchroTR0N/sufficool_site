import React from 'react'
import './src/styles/global.css'

// Phase 1: Comprehensive hydration diagnostics
export const onClientEntry = () => {
  console.log('🚀 Gatsby client entry point reached')
  console.log('📊 Client environment:', {
    userAgent: navigator.userAgent,
    reactVersion: require('react').version,
    gatsbyVersion: require('gatsby/package.json').version,
    nodeEnv: process.env.NODE_ENV
  })
}

export const onInitialClientRender = () => {
  console.log('✅ Gatsby initial client render completed')
  
  // Check if React root exists and has content
  const gatsbyDiv = document.getElementById('___gatsby')
  if (gatsbyDiv) {
    console.log('📦 Gatsby root element found:', {
      hasChildren: gatsbyDiv.children.length > 0,
      innerHTML: gatsbyDiv.innerHTML.substring(0, 200) + (gatsbyDiv.innerHTML.length > 200 ? '...' : ''),
      childCount: gatsbyDiv.children.length
    })
  } else {
    console.error('❌ Gatsby root element not found!')
  }
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log('🧭 Route update:', {
    from: prevLocation?.pathname || 'initial',
    to: location.pathname
  })
}

// Enhanced error boundary for hydration issues
export const wrapRootElement = ({ element }) => {
  console.log('🔧 wrapRootElement called')
  
  return (
    <HydrationErrorBoundary>
      {element}
    </HydrationErrorBoundary>
  )
}

// React Error Boundary for hydration debugging
class HydrationErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    console.error('🚨 Error boundary caught error:', error)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('🔍 Detailed error info:', {
      error: error.toString(),
      errorInfo,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    })
    
    // Check for hydration-specific errors
    if (error.message.includes('hydrat') || error.message.includes('server') || error.message.includes('client')) {
      console.error('🌊 HYDRATION ERROR DETECTED:', error.message)
    }
    
    this.setState({
      error,
      errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#fee', border: '1px solid #fcc' }}>
          <h2>🚨 Application Error Detected</h2>
          <p>Error: {this.state.error && this.state.error.toString()}</p>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary>Error Details</summary>
            {this.state.error && this.state.error.stack}
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }

    return this.props.children
  }
}