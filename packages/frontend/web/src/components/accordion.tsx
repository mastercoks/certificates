import { Dispatch, SetStateAction, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiChevronDown } from 'react-icons/fi'

import {
  Container,
  Padding,
  Header,
  Content
} from '../styles/components/accordion'

interface Props {
  isOpen?: boolean
  title?: string
  icon?: React.ComponentType<IconBaseProps>
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

const Accordion: React.FC<Props> = ({
  children,
  isOpen = false,
  title,
  icon: Icon,
  setIsOpen
}) => {
  const [accordionOpen, setAccordionOpen] = useState(isOpen)

  return (
    <Container>
      <Header
        onClick={() => {
          if (setIsOpen) {
            setIsOpen(!isOpen)
          } else {
            setAccordionOpen(!accordionOpen)
          }
        }}
        open={(setIsOpen && isOpen) || (!setIsOpen && accordionOpen)}
      >
        {Icon && (
          <div>
            <Icon size={20} />
          </div>
        )}
        <h2>{title}</h2>
        <div>
          <FiChevronDown size={20} />
        </div>
      </Header>
      {((setIsOpen && isOpen) || (!setIsOpen && accordionOpen)) && (
        <Content>{children}</Content>
      )}
    </Container>
  )
}

export default Accordion
