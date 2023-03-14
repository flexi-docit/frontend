<template>
    <div class="modal modal-edit">
        <h2 class="modal-title">Edit <b>{{ editingModule.name }}</b></h2>
        <form class="modal-form" id="create-modal-form" @submit.prevent="submitEditModule">
            <label for="name">Enter Name</label>
            <input type="text" id="name" placeholder="Enter Name" v-model="moduleName" />

            <label for="module-lead">Edit Module Lead</label>
            <select id="module-lead" form="edit-modal-form" @input="editModuleLead($event)">
                <option v-for="employee in allEmployees" :value="employee.id"
                    :selected="employee.id == editingModule.lead_id">{{ employee.name }}
                </option>
            </select>

            <label for="tags">Enter Tags</label>
            <select id="tags" form="edit-modal-form" @change="addTag($event)">
                <option value="none" selected disabled hidden>--Select Tags--</option>
                <option v-for="tag in allTags" :value="tag.id">{{ tag.name }}
                </option>
            </select>

            <span class="create-tags-span">
                <input type="text" id="newTag" placeholder="Didn't find your tag? Create One!" v-model="newTagName" />
                <button type="button" class="create-tag-btn" @click="createTag">&plus;</button>
            </span>

            <span class="modal-tags-span">
                <b v-if="selectedTags.length > 0">Selected Tags</b>
                <p v-for="selectedTag in selectedTags.slice(0, -1)" @click="removeTag(selectedTag)">{{ selectedTag.name
                }},</p>
                <p v-for="selectedTag in selectedTags.slice(-1)" @click="removeTag(selectedTag)">{{ selectedTag.name }}
                </p>
            </span>

            <button type="submit" class="modal-submit-btn">UPDATE</button>
        </form>
        <button class="modal-close-btn" @click="closeModuleModal">&#10006;</button>
    </div>
</template>

<script>
import { JWTIdentifier, serverBaseURL } from '@/utils/constants';
import Errors from "@/utils/errors";

export default {
    data() {
        return {
            newTagName: "",
            // Breaks if references are not kept, do not mess with lines below
            moduleLeadID: this.editingModule.lead_id,
            moduleName: this.editingModule.name,
            selectedTags: this.editingModule.tags.slice()
        };
    },
    props: {
        editingModule: Object,
        allEmployees: Array,
        allTags: Array,
    },
    methods: {
        async submitEditModule() {
            const jwt = localStorage.getItem(JWTIdentifier);
            try {
                const editModuleURL = `${serverBaseURL}/api/v1/module/${this.editingModule.id}`;
                const tagListIDs = this.selectedTags.map(t => t.id);
                const data = {
                    name: this.moduleName,
                    description: this.description,
                    lead_id: this.moduleLeadID,
                    project_id: 1,
                    tagList: tagListIDs
                }
                const editModuleResponse = await fetch(editModuleURL, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const editModuleRes = await editModuleResponse.json();

                if (editModuleRes.status) {
                    this.$parent.$emit("editModule", this.editingModule.id, this.moduleName, this.moduleLeadID, this.selectedTags);

                    const alertMessage = "Module \"" + this.editingModule.name + "\" edited!";
                    alert(alertMessage);

                    this.$parent.$emit("closeModuleModal");
                }
                else {
                    if (tagsResponse.status === 401) {
                        alert(Errors.LoginExpired);
                        localStorage.removeItem(JWTIdentifier);
                        this.$state.commit('clearUser');
                        return router.push("/login");
                    }

                    alert(Errors.InternalServerError);
                }
            } catch (error) {
                alert(Errors.InternalServerError);
            }
        },
        closeModuleModal() {
            this.$parent.$emit("closeModuleModal");
        },
        async createTag() {
            try {
                const jwt = localStorage.getItem(JWTIdentifier);

                const createTagURL = `${serverBaseURL}/api/v1/tag/`;
                const data = {
                    name: this.newTagName,
                }
                const createTagResponse = await fetch(createTagURL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const createTagRes = await createTagResponse.json();

                if (createTagRes.status) {
                    const id = createTagRes.data.tag_id;

                    // Creates tag in state
                    this.$parent.$emit("createTag", { id, name: this.newTagName });

                    const alertMessage = "Tag \"" + this.newTagName + "\" created!";
                    alert(alertMessage);
                    this.newTagName = "";
                } else {
                    if (tagsResponse.status === 401) {
                        alert(Errors.LoginExpired);
                        localStorage.removeItem(JWTIdentifier);
                        this.$state.commit('clearUser');
                        return router.push("/login");
                    }
                    alert(Errors.InternalServerError);
                }
            } catch (error) {
                alert(Errors.InternalServerError);
            }
        },
        addTag(e) {
            const selectedTagID = +e.target.value;
            if (this.selectedTags.length >= 3)
                return alert("Can only select upto 3 tags");
            if (this.selectedTags.find(t => t.id === selectedTagID))
                return;
            const selectedTag = this.allTags.find((t) => t.id === selectedTagID);
            this.selectedTags.push(selectedTag);
        },
        removeTag(id) {
            const idx = this.selectedTags.findIndex((tag) => tag.id === id);
            this.selectedTags.splice(idx, 1);
        },
        editModuleLead(e) {
            this.moduleLeadID = e.target.value;
        }
    }
}
</script>

<style lang="scss" scoped>
.modal {
    box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.25);
    z-index: 4;
    padding: 40px;
    border-radius: 10px;
    background-color: white;
    position: absolute;
    left: 50%;
    margin-top: auto;
    margin-bottom: auto;
    transform: translateX(-50%);
    width: 40%;

    @media screen and (max-width: 768px) {
        width: 70%;
        top: 20px;
    }

    @media screen and (max-width: 425px) {
        width: 85%;
        top: 60px;
    }

    .modal-title {
        font-size: 32px;
        font-weight: 400;
        margin-top: 20px;
        margin-bottom: 20px;

        @media screen and (max-width: 768px) {
            font-size: 26px;
        }

        @media screen and (max-width: 425px) {
            font-size: 20px;
        }
    }

    .modal-close-btn {
        position: absolute;
        padding: 20px;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        font-size: 24px;
    }

    >.modal-form {
        display: flex;
        flex-direction: column;

        >.modal-tags-span {
            display: flex;

            @media screen and (max-width: 425px) {
                font-size: 12px;
            }

            >p {
                cursor: not-allowed;
                padding: 6px;
                opacity: 0.9;

                &:hover {
                    border: 1px solid black;
                    opacity: 1;
                }
            }

            >b {
                padding: 6px;
            }
        }

        >.create-tags-span {
            >input {
                width: 80%;
                padding: 10px;
                border: 1px solid black;
                border-right: none;
                margin-bottom: 10px;

                @media screen and (max-width: 425px) {
                    font-size: 12px;
                }
            }

            >.create-tag-btn {
                background-color: rgba(0, 0, 0, 0);
                border: 1px solid black;
                border-left: none;
                padding: 10px;
                margin-bottom: 10px;

                @media screen and (max-width: 425px) {
                    font-size: 12px;
                }
            }
        }

        >label {
            text-align: left;
            font-size: 22px;
            font-weight: 300;
            margin-bottom: 10px;

            @media screen and (max-width: 768px) {
                font-size: 20px;
            }

            @media screen and (max-width: 425px) {
                font-size: 14px;
            }
        }

        >input,
        >select {
            padding: 10px;
            margin-bottom: 10px;

            @media screen and (max-width: 425px) {
                font-size: 12px;
            }
        }


        >.modal-submit-btn {
            margin-top: 20px;
            align-self: center;
            background-color: rgba(17, 47, 84, 1);
            color: white;
            width: 40%;
            font-size: 20px;
            font-weight: 700;
            padding: 10px;
            border-radius: 10px;

            @media screen and (max-width: 768px) {
                font-size: 18px;
            }

            @media screen and (max-width: 425px) {
                font-size: 12px;
            }
        }
    }
}
</style>