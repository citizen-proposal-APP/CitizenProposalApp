import { useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group, rem, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './LinksGroup.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link: string;
  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, link, links }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text component="a" className={classes.link} href={link.link} key={link.label}>
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
        component="a"
        href={link}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
