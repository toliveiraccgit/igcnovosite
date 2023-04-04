import './ModalSocial.scss'

function ModalSocial( {className, modalRef } ) {

  return(
    <div ref={modalRef} className={`${className} modal`}>
      <p>Testando</p>
    </div>  
  )
}

export default ModalSocial