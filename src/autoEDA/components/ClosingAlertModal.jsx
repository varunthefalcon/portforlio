import { Button, Modal } from "semantic-ui-react";

// todo

const ClosingAlertModal = (props) => {
  const { closingAlertModal, setClosingAlertModal } = props;
  return (
    <>
      <Modal
        dimmer="blurring"
        open={closingAlertModal}
        onClose={() => setClosingAlertModal(false)}
      >
        <Modal.Header>Use Google's location service?</Modal.Header>
        <Modal.Content>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => setClosingAlertModal(false)}>
            Okay
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ClosingAlertModal;

// const [closingAlertModal, setClosingAlertModal] = useState(false);
// const handler = (event) => {
//     event.preventDefault();
//     event.returnValue = "";
//   };
//   useEffect(() => {
//     window.document.addEventListener("beforeunload", handler, true);
//     window.document.addEventListener("unload", handler, true);

//     return () => {
//       window.document.removeEventListener("unload", handler, true);
//       window.document.removeEventListener("beforeunload", handler, true);
//     };
//   }, []);

//  {/* alert before close  */}
//  <ClosingAlertModal
//  closingAlertModal={closingAlertModal}
//  setClosingAlertModal={setClosingAlertModal}
// />
