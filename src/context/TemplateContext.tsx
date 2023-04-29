import { ReactElement, createContext, useContext, useState } from "react"

type Props = {
    children: ReactElement
}

const TemplateContext = createContext(null);

export function useTemplate(){
    return useContext(TemplateContext);
}

export default function AuthProvider({children}: Props) {
  const [template, setTemplate] = useState(null)

  return (
    <TemplateContext.Provider value={template}>
        {children}
    </TemplateContext.Provider>
  )
}