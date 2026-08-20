import basicDemo from './demo/basic.twig';
import data from './demo/data.json';
const basicTableCodeExample = (tableClass) => {
  const withArgs = tableClass ? ` with { table_class: '${tableClass}' }` : '';
  return `{% embed '@cloudfour/components/table/table.twig'${withArgs} only %}
  {% block caption %}
    {# Optionally add a caption string #}
    Comparing popular Cloud Four projects on GitHub.
  {% endblock %}
  {% block header %}
    {# Optionally add a single \`<tr>\` element #}
    <tr>...</tr>
  {% endblock %}
  {% block body %}
    {# Add \`<tr>\` elements #}
    <tr>...</tr>
    <tr>...</tr>
  {% endblock %}
  {% block footer %}
    {# Optionally add a single \`<tr>\` element #}
    <tr>...</tr>
  {% endblock %}
{% endembed %}`;
};

export default {
  title: 'Components/Table',
  args: {
    hasHeader: true,
    hasFooter: true,
    hasCaption: true,
    isRuled: false,
    isStriped: false,
    numericData: false,
  },
  argTypes: {
    hasHeader: {
      name: 'Include Header',
      type: { name: 'boolean' },
    },
    hasFooter: {
      name: 'Include Footer',
      type: { name: 'boolean' },
    },
    hasCaption: {
      name: 'Include Caption',
      type: { name: 'boolean' },
    },
    isRuled: {
      name: 'Add `c-tabled--ruled` modifier to the table',
      type: { name: 'boolean' },
    },
    isStriped: {
      name: 'Add `c-tabled--striped` modifier to the table',
      type: { name: 'boolean' },
    },
    numericData: {
      name: 'Add `c-table--numeric` modifier to the table',
      type: { name: 'boolean' },
    },
  },
  render: (args) => basicDemo({ ...args, tableData: data }),
};

export const Basic = {
  parameters: { docs: { source: { code: basicTableCodeExample() } } },
};

export const Ruled = {
  args: { isRuled: true },
  parameters: {
    docs: { source: { code: basicTableCodeExample('c-table--ruled') } },
  },
};

export const Striped = {
  args: { isStriped: true },
  parameters: {
    docs: { source: { code: basicTableCodeExample('c-table--striped') } },
  },
};

export const NumericData = {
  name: 'Numeric Data',
  args: { numericData: true },
  parameters: {
    docs: { source: { code: basicTableCodeExample('c-table--numeric') } },
  },
};
