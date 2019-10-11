<template lang="pug">
  li.list-group-item.list-group-item-action
    small.float-right {{ date }}
    p.mb-1.mt-4 {{ description }}
</template>

<script>
export default {
  props: {
    description: String,
    date: String,
  },
};
</script>
