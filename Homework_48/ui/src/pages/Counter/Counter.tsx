import { Counter } from '../../components/Counter/Counter';
import Container from '../../components/ui/Container/Container';
import PageHead from '../../components/ui/PageHead/PageHead';

function Component() {
  return (
    <Container>
      <PageHead>Counter</PageHead>
      <Counter />
    </Container>
  );
}

export { Component };
