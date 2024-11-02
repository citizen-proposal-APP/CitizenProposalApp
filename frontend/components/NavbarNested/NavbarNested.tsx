import { Button, Code, Group, ScrollArea } from '@mantine/core';
import { LinksGroup } from '@/components/NavbarLinksGroup/NavbarLinksGroup';
import { links } from '@/data/links';
import classes from './NavbarNested.module.css';

export function NavbarNested() {
  const items = links.map((item) => <LinksGroup {...item} key={item.label} />);

  // TODO change the header
  return (
    <>
      <div className={classes.header}>
        <Group justify="space-between">
          您尚未登入 您好！伊隆馬。
          {/* <Logo size={30} /> */}
          {/* <Logo style={{ width: rem(120) }} /> */}
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{items}</div>
      </ScrollArea>

      <div className={classes.footer}>
        {/* <Group justify="space-betweexn"> */}
        <Button variant="default">Log in</Button>
        <Button>Sign up</Button>
        {/* <UserButton /> */}
        {/* </Group> */}
      </div>
    </>
  );
}
