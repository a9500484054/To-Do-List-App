

<template>
    <Icon icon="mdi-light:home" />
    <Icon icon="oui:logstash-queue" width="16" height="16" />
    Главная
    <Button
        @click="() => console.log('1')"
        label="Click Me" 
        icon="mdi:heart" 
        primary size="l"/>
    <Button
        @click="() => console.log('2')"
        icon="mdi:heart" 
        primary size="m"/>
    <Button
        @click="() => console.log('3')"
        label="Click Me" 
        icon="mdi:heart" 
        primary size="s"/>
    <Card>
        Это контент, который будет отображаться внутри карточки.
    </Card>
    <TextField v-model="text" label="Enter text" placeholder="Type something..." />
    <SearchField @search="handleSearch" placeholder="Search users..." />
    <Radio v-model="selectedOption" value="option1" label="Option 1" />
    <Radio v-model="selectedOption" value="option2" label="Option 2" />
    <Checkbox v-model="isChecked" label="Accept terms" />
    <Logo src="./src/app/assets/ToDoList.svg" alt="My Company Logo" size="100px" />


</template>

<script setup>
    import { Icon } from "@iconify/vue";
    
    import { 
        Button,
        Card,
        TextField,
        SearchField,
        Radio,
        Checkbox,
        Logo 
    } from '@/shared/components';
    // import Button from '@/shared/ui/Button/Button.vue';
    // import Card from '@/shared/ui/Card/Card.vue';
    // import TextField from '@/shared/ui/TextField/TextField.vue';
    // import SearchField from '@/shared/ui/SearchField/SearchField.vue';
    // import Radio from '@/shared/ui/Radio/Radio.vue';
    // import Checkbox from '@/shared/ui/Checkbox/Checkbox.vue';   
    // import Logo from '@/shared/ui/Logo/Logo.vue';
    
</script>

<style scoped>

</style>
