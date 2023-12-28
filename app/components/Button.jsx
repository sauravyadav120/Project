const Button = ({className,text,onClick,disabled,type}) => {
  return (
    <button type={type} className={`bg-buttonBgPrimaryColor text-buttonTextPrimaryColor rounded-full ${className}`} onClick={onClick} disabled={disabled}>
            {text}
    </button>
  )
}

export default Button