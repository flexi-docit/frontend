<template>
    <section class="team-lead-employees">
        <h1 class="team-lead-employees-header">Employee Information</h1>
        <div class="team-lead-employees-search">
            <input placeholder="Search" @input="searchEmployee" v-model="searchTerm" />
            <span>&#8981;</span>
        </div>
        <div class="team-lead-employees-container">
            <div class="team-lead-employee-row" v-for="(emp) in shownEmployees" :key="emp.id">
                <p class="name">{{ emp.name }}</p>
                <p class="email">{{ emp.email }}</p>
                <p class="role">{{ emp.role }}</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: "",
            shownEmployees: []
        }
    },
    props: {
        allEmployees: Array
    },
    methods: {
        searchEmployee() {
            const employeeRegex = new RegExp(`.*${this.searchTerm}.*`, "i");
            let list = [];
            this.allEmployees.forEach(emp => {
                if ((employeeRegex).test(emp.name) || (employeeRegex).test(emp.email) || (employeeRegex).test(emp.role)) list.push(emp);
            });
            this.shownEmployees = list;
        }
    },
    created() {
        this.shownEmployees = this.allEmployees;
        this.shownEmployees.sort((a, b) => { return (a.name >= b.name) ? 1 : -1 })
    }
}
</script>

<style lang="scss" scoped>
.team-lead-employees {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 30px 7% 10px 7%;
    text-align: left;
    min-height: 700px;
    max-height: 700px;

    >.team-lead-employees-search {
        display: flex;
        width: 100%;

        >input {
            width: 95%;
            padding: 8px 12px 8px 12px;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            border: 1px solid black;
            border-right: none;
        }

        >span {
            text-align: right;
            width: 5%;
            padding: 8px 12px 8px 12px;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            background-color: white;
            margin-right: 10px;
            color: black;
            border: 1px solid black;
            border-left: none;
        }
    }

    >.team-lead-employees-header {
        font-size: 36px;

        @media screen and (max-width: 550px) {
            font-size: 26px;
        }
    }

    >.team-lead-employees-container {
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        row-gap: 10px;

        >.team-lead-employee-row {
            font-size: 19px;
            display: flex;
            justify-content: flex-start;
            position: relative;
            border-bottom: 1px solid black;
            padding: 10px;

            @media screen and (max-width: 550px) {
                font-size: 16px;
            }

            >.email {
                flex: 0 1 auto;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);

                @media screen and (max-width: 768px) {
                    display: none;
                }
            }

            >.role {
                flex: 0 1 auto;
                margin-left: auto;
            }
        }
    }
}
</style>