import { useRouter } from 'next/router'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
import {
  FiBookmark,
  FiCalendar,
  FiEdit,
  FiHash,
  FiMapPin,
  FiTag,
  FiTrash2,
  FiUser
} from 'react-icons/fi'

import IEvent from '../../dtos/IEvent'
import { useAuth } from '../../providers/auth'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import {
  Container,
  ButtonContainer
} from '../../styles/components/tabs/eventinfo'
import { formatData } from '../../utils/formatters'
import Alert from '../alert'
import Button from '../button'
import DeleteModal from '../modals/deleteModal'
import EventModal from '../modals/eventModal'

interface Props {
  event: IEvent
  setEvent: Dispatch<SetStateAction<IEvent>>
}

const EventInfo: React.FC<Props> = ({ event, setEvent }) => {
  const [show, setShow] = useState(false)
  const [openEventModal, setOpenEventModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const { addToast } = useToast()
  const { isAdmin } = useAuth()
  const router = useRouter()

  const handleSubmitDelete = useCallback(async () => {
    try {
      await api.delete(`events/${event.id}`)
      addToast({
        title: 'Evento excluido',
        type: 'success',
        description: `${event.name} excluído com sucesso.`
      })
      setOpenDeleteModal(false)
      router.push(`/events`)
    } catch (err) {
      addToast({
        title: 'Erro na exclusão',
        type: 'error',
        description: err
      })
    }
  }, [addToast, event, router])

  const handleCloseEventModal = useCallback(() => {
    setOpenEventModal(false)
  }, [])

  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false)
  }, [])

  useEffect(() => {
    if (!show) {
      setShow(isAdmin)
    }
  }, [show, isAdmin])

  return (
    <Container>
      <div>
        <Alert marginBottom="sm" size="sm">
          Nome do Evento:
        </Alert>
        <Alert icon={FiBookmark} marginBottom="md">
          <b>{event?.name}</b>
        </Alert>
        <Alert marginBottom="sm" size="sm">
          Sigla:
        </Alert>
        <Alert icon={FiHash} marginBottom="md">
          <b>{event?.initials}</b>
        </Alert>
        <Alert marginBottom="sm" size="sm">
          Edição:
        </Alert>
        <Alert icon={FiTag} marginBottom="md">
          <b>{event?.edition}</b>
        </Alert>
        <Alert marginBottom="sm" size="sm">
          Local:
        </Alert>
        <Alert icon={FiMapPin} marginBottom="md">
          <b>{event?.local}</b>
        </Alert>
        <Alert marginBottom="sm" size="sm">
          Período:
        </Alert>
        <Alert icon={FiCalendar} marginBottom="md">
          <b>
            De {formatData(event?.start_date)} até {formatData(event?.end_date)}
          </b>
        </Alert>
        <Alert marginBottom="sm" size="sm">
          Coordenador:
        </Alert>
        <Alert icon={FiUser}>
          <b>{event?.user.name}</b>
        </Alert>
      </div>
      {show && (
        <ButtonContainer>
          <Button
            marginBottom="xs"
            size="small"
            color="secondary"
            onClick={() => {
              setOpenEventModal(true)
            }}
          >
            <FiEdit size={20} />
            <span>Editar</span>
          </Button>
          <Button
            size="small"
            color="danger"
            outline
            onClick={() => {
              setOpenDeleteModal(true)
            }}
          >
            <FiTrash2 size={20} />
            <span>Excluir</span>
          </Button>
        </ButtonContainer>
      )}
      <EventModal
        type="edit"
        event={event}
        openModal={openEventModal}
        onClose={handleCloseEventModal}
        setEvent={setEvent}
      />
      <DeleteModal
        name="Evento"
        openModal={openDeleteModal}
        onClose={handleCloseDeleteModal}
        handleSubmit={handleSubmitDelete}
      >
        <Alert>
          Tem certeza que você deseja excluir o evento <b>{event?.name}</b>?
        </Alert>
      </DeleteModal>
    </Container>
  )
}

export default EventInfo
