import { Container } from "react-bootstrap";

interface Props {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

export default function Layout({ title, children }: Props) {
  return (
    <Container>
      <h1>{title}</h1>

      {children}
    </Container>
  );
}
