import React, { useState } from "react";
import { LayoutGroup , motion } from "framer-motion"

const Tab = ({ label, isSelected }) => {
    return (
      <li>
        {label}
        {isSelected
          ? <motion.div layoutId="underline" />
          : null}
      </li>  
    )
  }
  
  const TabRow = ({ items }) => {
    return items.map(item => <Tab {...item} />)
  }




const ToggleContent = ({ header, content }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.h2 layout>{header}</motion.h2>
        {isOpen ? content : null}
      </motion.div>
    )
}

    const App =() => {
        return (
          <>
    <LayoutGroup id="top5">
    <ToggleContent header={'header'} content={'content'} />
      <ToggleContent />
    </LayoutGroup>  
          </>  
        )
  }

  export default App;
  