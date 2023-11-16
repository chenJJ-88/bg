export default interface ModalProps {
  title?: string
  visible: boolean
  onCancel: (prs: boolean) => void
  children: any
  height?: number
  width?: number
  getContainert?: string
  icon?: string
  extra?: string | HTMLElement
}