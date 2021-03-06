import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'

import IEvent from '../../dtos/IEvent'
import { Section } from '../../styles/components/accordion'
import {
  EditContainer,
  LayoutContainer
} from '../../styles/components/accordions/certificateLayout'
import { Divider } from '../../styles/components/divider'
import { useDebounce } from '../../utils/debounce'
import VariableModal from '../modals/variableModal'
import RichTextEditor from '../richTextEditor'
import Select from '../select'
import SliderBar from '../sliderBar'
import Certificate from './certificate'

interface Props {
  initialTextConfig: any
  initialTextPadding: any
}

const CertificateLayout: React.FC<Props> = ({
  initialTextConfig,
  initialTextPadding
}) => {
  const formRef = useRef<FormHandles>(null)
  const [textConfig, setTextConfig] = useState<any>(initialTextConfig)

  const [displayTextGuide, setDisplayTextGuide] = useState(false)
  const [displayValidateGuide, setDisplayValidateGuide] = useState(false)

  const { run } = useDebounce<any>(config => {
    onConfigChange(config)
  })

  const onConfigChange = useCallback(config => {
    setTextConfig({ ...config })
  }, [])

  const [openModal, setOpenModal] = useState(false)

  const handleClose = useCallback(() => {
    setOpenModal(false)
  }, [])

  const handleAddVariable = useCallback(state => {
    setOpenModal(true)
  }, [])

  return (
    <Form
      initialData={textConfig}
      ref={formRef}
      onSubmit={() => {
        console.log()
      }}
    >
      <Section paddingTop="sm" paddingBottom="sm">
        <div>
          <RichTextEditor
            handleAddVariable={state => handleAddVariable(state)}
            onChange={({ html }) =>
              onConfigChange({ ...textConfig, html: html })
            }
            initialHTMLValue={textConfig.html}
            label="Texto"
          />
        </div>
      </Section>
      <Divider />
      <Section paddingTop="sm" paddingBottom="sm">
        <LayoutContainer>
          <Certificate
            displayValidateGuide={displayValidateGuide}
            validateHorizontalPosition={textConfig.validateHorizontalPosition}
            validateVerticalPosition={textConfig.validateVerticalPosition}
            validateHorizontalPadding={textConfig.validateHorizontalPadding}
            validateVerticalPadding={textConfig.validateVerticalPadding}
            displayTextGuide={displayTextGuide}
            padding={textConfig.padding}
            position={textConfig.position}
            html={textConfig.html}
            paddingBottom={textConfig.paddingBottom}
            paddingTop={textConfig.paddingTop}
            paddingLeft={textConfig.paddingLeft}
            paddingRight={textConfig.paddingRight}
          />
          <EditContainer>
            <Divider />
            <h3 style={{ marginTop: '10px', marginBottom: '10px' }}>
              Texto Principal
            </h3>
            <Divider style={{ marginBottom: '10px' }} />
            <Select
              formRef={formRef}
              handleOnSelect={data => {
                onConfigChange({
                  ...textConfig,
                  position: data.value,
                  ...initialTextPadding
                })
              }}
              initialValue="center"
              label="Posição"
              name="position"
              options={[
                {
                  value: 'center',
                  label: 'Centralizado'
                },
                {
                  value: 'custom',
                  label: 'Personalizado'
                }
              ]}
              marginBottom="sm"
            />
            {textConfig?.position === 'center' && (
              <SliderBar
                onFocus={() => {
                  setDisplayTextGuide(true)
                }}
                onBlur={() => {
                  setDisplayTextGuide(false)
                }}
                formRef={formRef}
                name="padding"
                label="Margem"
                marginBottom="sm"
                min="0"
                max="25"
                onChange={data => {
                  run({
                    ...textConfig,
                    padding: parseInt(data.target.value)
                  })
                }}
              />
            )}
            {textConfig?.position === 'custom' && (
              <SliderBar
                onFocus={() => {
                  setDisplayTextGuide(true)
                }}
                onBlur={() => {
                  setDisplayTextGuide(false)
                }}
                formRef={formRef}
                name="paddingTop"
                label="Margem Cima"
                marginBottom="sm"
                min="0"
                max="60"
                onChange={data => {
                  run({
                    ...textConfig,
                    paddingTop: parseInt(data.target.value)
                  })
                }}
              />
            )}
            {textConfig?.position === 'custom' && (
              <SliderBar
                onFocus={() => {
                  setDisplayTextGuide(true)
                }}
                onBlur={() => {
                  setDisplayTextGuide(false)
                }}
                formRef={formRef}
                name="paddingBottom"
                label="Margem Baixo"
                marginBottom="sm"
                min="0"
                max="60"
                onChange={data => {
                  run({
                    ...textConfig,
                    paddingBottom: parseInt(data.target.value)
                  })
                }}
              />
            )}
            {textConfig?.position === 'custom' && (
              <SliderBar
                onFocus={() => {
                  setDisplayTextGuide(true)
                }}
                onBlur={() => {
                  setDisplayTextGuide(false)
                }}
                formRef={formRef}
                name="paddingLeft"
                label="Margem Esquerda"
                marginBottom="sm"
                min="0"
                max="60"
                onChange={data => {
                  run({
                    ...textConfig,
                    paddingLeft: parseInt(data.target.value)
                  })
                }}
              />
            )}
            {textConfig?.position === 'custom' && (
              <SliderBar
                formRef={formRef}
                name="paddingRight"
                label="Margem Direita"
                marginBottom="sm"
                min="0"
                max="60"
                onFocus={() => {
                  setDisplayTextGuide(true)
                }}
                onBlur={() => {
                  setDisplayTextGuide(false)
                }}
                onChange={data => {
                  run({
                    ...textConfig,
                    paddingRight: parseInt(data.target.value)
                  })
                }}
              />
            )}
            <Divider style={{ marginTop: '30px' }} />
            <h3 style={{ marginTop: '10px', marginBottom: '10px' }}>
              Mensagem de Validação
            </h3>
            <Divider style={{ marginBottom: '10px' }} />
            <Select
              formRef={formRef}
              handleOnSelect={data => {
                setTextConfig({
                  ...textConfig,
                  validateVerticalPosition: data.value
                })
                setDisplayValidateGuide(false)
              }}
              onFocus={() => {
                setDisplayValidateGuide(true)
              }}
              onBlur={() => {
                setDisplayValidateGuide(false)
              }}
              label="Posição vertical"
              name="validateVerticalPosition"
              options={[
                {
                  value: 'top',
                  label: 'Cima'
                },
                {
                  value: 'bottom',
                  label: 'Baixo'
                }
              ]}
              marginBottom="sm"
            />
            <SliderBar
              formRef={formRef}
              name="validateVerticalPadding"
              label={
                'Margem ' +
                (textConfig.validateVerticalPosition === 'top'
                  ? 'cima'
                  : 'baixo')
              }
              step="0.5"
              marginBottom="sm"
              min="0"
              max="10"
              onChange={data => {
                run({
                  ...textConfig,
                  validateVerticalPadding: data.target.value
                })
              }}
              onFocus={() => {
                setDisplayValidateGuide(true)
              }}
              onBlur={() => {
                setDisplayValidateGuide(false)
              }}
            />
            <Select
              formRef={formRef}
              handleOnSelect={data => {
                setTextConfig({
                  ...textConfig,
                  validateHorizontalPosition: data.value
                })
                setDisplayValidateGuide(false)
              }}
              onFocus={() => {
                setDisplayValidateGuide(true)
              }}
              onBlur={() => {
                setDisplayValidateGuide(false)
              }}
              label="Posição horizontal"
              name="validateHorizontalPosition"
              options={[
                {
                  value: 'left',
                  label: 'Esquerda'
                },
                {
                  value: 'center',
                  label: 'Centro'
                },
                {
                  value: 'right',
                  label: 'Direita'
                }
              ]}
              marginBottom="sm"
            />
            {(textConfig.validateHorizontalPosition === 'left' ||
              textConfig.validateHorizontalPosition === 'right') && (
              <SliderBar
                step="0.5"
                formRef={formRef}
                name="validateHorizontalPadding"
                label={
                  'Margem ' +
                  (textConfig.validateHorizontalPosition === 'left'
                    ? 'esquerda'
                    : 'direita')
                }
                marginBottom="sm"
                min="0"
                max="10"
                onChange={data => {
                  run({
                    ...textConfig,
                    validateHorizontalPadding: data.target.value
                  })
                }}
                onFocus={() => {
                  setDisplayValidateGuide(true)
                }}
                onBlur={() => {
                  setDisplayValidateGuide(false)
                }}
              />
            )}
          </EditContainer>
        </LayoutContainer>
      </Section>
      <VariableModal openModal={openModal} onClose={handleClose} />
    </Form>
  )
}

export default CertificateLayout
