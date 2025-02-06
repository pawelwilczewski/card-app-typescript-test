import ThemeSwitch from "@/features/theme/components/theme-switch";

export default function Footer(): JSX.Element {
  return (
    <footer className="container my-5 flex flex-wrap-reverse gap-5 justify-between items-center">
      <div className="text-sm text-muted-foreground">
        2025&nbsp;
        <a href="https://github.com/TimMurnaghan/card-app-typescript-test" className="hover:underline">
          Test
        </a>
        &nbsp;submission&nbsp;by&nbsp;
        <a href="https://github.com/pawelwilczewski/card-app-typescript-test" className="hover:underline">
          Pawel&nbsp;Wilczewski
        </a>
      </div>
      <ThemeSwitch />
    </footer>
  );
}
