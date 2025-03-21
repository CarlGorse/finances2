import OperationButton from "./OperationButton";

export default function OperationButtons(setShowSidebar) {
  return (
    <>
      <span style={{ marginLeft: "20px" }}>
        <OperationButton description="Add" setShowSidebar={setShowSidebar} />
      </span>

      <span style={{ marginLeft: "1px" }}>
        <OperationButton description="Edit" setShowSidebar={setShowSidebar} />
      </span>

      <span style={{ marginLeft: "1px" }}>
        <OperationButton description="Delete" setShowSidebar={setShowSidebar} />
      </span>

      <span style={{ marginLeft: "1px" }}>
        <OperationButton
          description="Move wages"
          setShowSidebar={setShowSidebar}
        />
      </span>
    </>
  );
}
