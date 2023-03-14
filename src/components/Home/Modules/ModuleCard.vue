<template>
    <div class="module-card">
        <section class="module-card-main">
            <span class="module-card-main-letterhead">{{ module.name.substring(0, 1) }}</span>
            <span class="module-card-main-text">
                <h5 class="module-card-main-text-title">{{ module.name }}</h5>
                <p class="module-card-main-text-date">Created On - {{ module.createdAt.toDateString() }}</p>
                <p class="module-card-main-text-description">{{ module.description }}</p>
            </span>
        </section>
        <section class="module-card-options">
            <span class="module-card-options-btn-grp">
                <button class="edit" @click="openModuleEditingModal">Edit</button>
                <button class="delete" @click="deleteModule">Delete</button>
            </span>
            <span class="module-card-options-tags-grp">
                <p v-for="(tag) in module.tags" :key="tag.id">{{ tag.name.length > 5 ? tag.name.substr(0, 5) + "..." :
                    tag.name }}</p>
            </span>
        </section>
    </div>
</template>

<script>
import { JWTIdentifier, serverBaseURL } from '@/utils/constants';
import Errors from "@/utils/errors";

export default {
    props: {
        module: Object
    },
    methods: {
        openModuleEditingModal() {
            this.$parent.$emit("openModuleEditingModal", { module: this.module });
        },
        async deleteModule() {
            const jwt = localStorage.getItem(JWTIdentifier);
            const confirmation = window.confirm("Careful! You are about to delete a module, this is a dangerous action");

            if (confirmation) {
                const deleteModuleURL = `${serverBaseURL}/api/v1/module/${this.module.id}`;
                const deleteModuleResponse = await fetch(deleteModuleURL, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                    },
                });
                const deleteModuleRes = await deleteModuleResponse.json();

                if (deleteModuleRes.status) {
                    this.$emit("deleteModule", this.module.id);

                    return alert("Module deleted!");
                }

                if (deleteModuleResponse.status === 401) {
                    alert(Errors.LoginExpired);
                    localStorage.removeItem(JWTIdentifier);
                    this.$state.commit('clearUser');
                    return router.push("/login");
                }

                alert(Errors.InternalServerError);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.module-card {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    column-gap: 10px;
    align-items: center;
    background-color: white;
    padding: 10px;
    width: 30%;
    opacity: 0.9;

    @media screen and (max-width: 1024px) {
        width: 45%;
    }

    @media screen and (max-width: 550px) {
        width: 100%;
    }

    &:hover {
        opacity: 1;
        box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.25);
    }

    >.module-card-main {
        display: flex;
        height: 100%;
        font-size: 12px;
        width: 100%;
        column-gap: 10px;

        >.module-card-main-letterhead {
            background-color: rgba(17, 47, 84, 1);
            font-size: 28px;
            padding: 16px;
            color: white;
            font-weight: 600;
            width: fit-content;
        }

        >.module-card-main-text {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            color: rgba(0, 94, 151, 1);

            >.module-card-main-text-title {
                font-size: 18px;
            }

            >.module-card-main-text-description {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
    }

    >.module-card-options {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        font-size: 13px;

        >.module-card-options-tags-grp {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            height: 40px;
            width: 60%;
            overflow-y: scroll;
            justify-content: flex-end;

            >p {
                display: flex;
                align-items: center;
                font-size: 12px;
                text-transform: uppercase;
                width: fit-content;
                height: fit-content;
                padding: 8px;
                background-color: rgb(17, 47, 84);
                color: white;
            }
        }

        >.module-card-options-btn-grp {
            display: flex;
            align-items: center;
            column-gap: 5px;

            >.edit {
                color: rgba(0, 94, 151, 1);
            }

            >.delete {
                color: rgba(152, 0, 71, 1);
            }

            >button {
                background-color: rgba(0, 0, 0, 0);
                border: none;
                font-weight: 600;
            }
        }
    }
}
</style>