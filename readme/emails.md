# adcards.cz emails

Emails are created with react and exported to html. These html templates can be then rendered with twig. All of props
necessary to render are defined with typescript and their default value is string that its value is referencing
something in twig.

## Example

```tsx
    export const Layout = ({ name } = { name: "{{ name }}" }) => {

  return <>
    Hello ${name}!
  </>
}
```

which results to:

```html
    Hello, {{ name }}!
```

and that can be easily rendered with twig