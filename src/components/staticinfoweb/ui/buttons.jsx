function Button({ children, variant = "default", size = "default", className = "", ...props }) {
    const baseStyle =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    }
  
    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md text-xs",
      lg: "h-11 px-8 rounded-md text-base",
    }
  
    const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`
  
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    )
  }
  
  export default Button
  
  