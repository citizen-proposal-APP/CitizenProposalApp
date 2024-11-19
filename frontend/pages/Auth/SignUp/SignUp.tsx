import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import classes from './signup.module.css';
interface SignUpProps {
    onToggle: () => void; // switch between login and sign up
}

export function SignUp({ onToggle }: SignUpProps) {
    return (
        <Container size={420} my={40}>
            <Title ta="center" style={{ color: 'white' }} className={classes.title}>
                建立帳號
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                已經有帳號了嗎？{' '}
                <Anchor size="sm" component="button" onClick={onToggle}>
                    登入
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Name" placeholder="Your name" required />
                <TextInput label="Email" placeholder="your@gmail.com" required mt="md" />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <PasswordInput label="Confirm Password" placeholder="Confirm your password" required mt="md" />
                
                <Button fullWidth mt="xl">
                    建立帳號
                </Button>
            </Paper>
        </Container>
    );
}
