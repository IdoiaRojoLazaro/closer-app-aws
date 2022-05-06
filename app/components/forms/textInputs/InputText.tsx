export const InputText = ({ name, type, required = true }: { name: string, type: string, required?: boolean }) => {
  return (
    <input name={name} type={type} required={required} />
  )
}
