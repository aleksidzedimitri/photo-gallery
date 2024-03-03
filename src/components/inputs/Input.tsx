interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export default function Input({ icon, ...rest }: InputProps) {
  const classes =
    "form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md text-lg leading-tight focus:border-gray-700";

  return (
    <div className="flex items-center space-x-2">
      {icon && (
        <span className="flex items-center justify-center text-lg w-10 h-10 mt-8">
          {icon}
        </span>
      )}
      <input {...rest} className={`${classes} ${rest.className}`} />
    </div>
  );
}
