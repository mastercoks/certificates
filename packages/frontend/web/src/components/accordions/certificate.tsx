import {
  Container,
  ImageContainer,
  TextContainer,
  ValidateContainer
} from '../../styles/components/accordions/certificate'

interface Props {
  position: 'center' | 'custom'
  html: string
  padding: number
  paddingTop: number
  paddingBottom: number
  paddingLeft: number
  paddingRight: number
  validateVerticalPadding: number
  validateHorizontalPadding: number
  displayTextGuide: boolean
  displayValidateGuide: boolean
  validateVerticalPosition: 'bottom' | 'top'
  validateHorizontalPosition: 'right' | 'left' | 'center'
}

const Certificate: React.FC<Props> = ({
  padding,
  html,
  position,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  displayTextGuide,
  validateHorizontalPosition,
  validateVerticalPosition,
  validateHorizontalPadding,
  validateVerticalPadding,
  displayValidateGuide
}) => {
  return (
    <Container>
      <ImageContainer>
        <img src="/teste.jpeg" alt="Imagem de fundo" />
        <TextContainer
          displayGuide={displayTextGuide}
          paddingBottom={paddingBottom}
          paddingTop={paddingTop}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          padding={padding}
          position={position}
        >
          <div className="text">
            <div
              className="center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </TextContainer>
        <ValidateContainer
          displayGuide={displayValidateGuide}
          horizontalPosition={validateHorizontalPosition}
          verticalPosition={validateVerticalPosition}
          horizontalPadding={validateHorizontalPadding}
          verticalPadding={validateVerticalPadding}
        >
          <div className="text">
            Código: <b>afae7289-6af4-4cbd-a16d-71247119914a</b> | Para validar
            clique
            <a href="http://certificados.ifba.edu.br/validar">aqui</a> ou acesse
            <a href="http://certificados.ifba.edu.br/validar">
              http://certificados.ifba.edu.br/validar
            </a>
          </div>
        </ValidateContainer>
      </ImageContainer>
    </Container>
  )
}

export default Certificate
