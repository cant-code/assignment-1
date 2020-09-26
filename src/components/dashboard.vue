<template>
  <b-container fluid>
    <b-jumbotron class="mt-3">
      <div class="h1 text-center">Tasks</div>
      <hr/>
      <b-row>
        <b-col lg="3" md="4" cols="6" v-for="item in getTasks" :key="item.trackid">
          <b-card-group>
            <b-card :img-src="'data:image/png;base64,'+item.track_image" img-top class="mb-3">
              <b-row>
                <b-col cols="8">
                  <b-card-title>Task-{{item.trackid}}</b-card-title>
                </b-col>
                <b-col>
                  <b-button size="sm" variant="dark" class="mb-2" @click="deleteTask(item.trackid)">
                    <b-icon icon="trash-fill" variant="white"></b-icon>
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-card-group>
        </b-col>
        <b-col lg="3" md="4" cols="6" align-self="center" @click="$bvModal.show('bv-modal-example')">
          <b-card align="center">
            <b-aspect>
              <b-icon icon="plus-circle" class="my-5" font-scale="7"></b-icon>
            </b-aspect>
          </b-card>
        </b-col>
      </b-row>
    </b-jumbotron>
    <b-modal id="bv-modal-example" hide-footer>
    <template v-slot:modal-title>
      Add Task
    </template>
    <div class="d-block text-center">
      <b-form @submit="addTasks">
        <b-form-group id="input-group-1" label="ID:" label-for="input-1" label-cols-sm="2">
          <b-form-input id="input-1" type="text" :state="idValid" v-model="form.id" required placeholder="Enter task ID" />
          <b-form-invalid-feedback :state="idValid">
            ID already exists
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-2" label="Task Details:" label-for="input-2" label-cols-sm="2">
          <b-form-input id="input-2" type="text" v-model="form.desc" required placeholder="Enter details"/>
        </b-form-group>
        <b-form-group id="input-group-3" label="Track:" label-for="input-3" label-cols-sm="2">
          <b-form-select id="input-3" :options="options" v-model="form.track" required></b-form-select>
        </b-form-group>
        <b-form-group label="Image:" label-for="image" label-cols-sm="2" id="input-group-4">
          <b-form-file accept="image/*" v-model="form.file" id="image"
          placeholder="Choose a file or drop it here" drop-placeholder="Drop file here..."></b-form-file>
        </b-form-group>
        <b-button block type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </b-modal>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { value: null, text: 'Please select some item' },
        { value: 'a', text: 'Beginner' },
        { value: 'b', text: 'Intermediate' },
        { value: 'c', text: 'Advanced' },
      ],
      form: {
        id: null,
        desc: null,
        track: null,
        file: null,
      },
      tasks: [],
    }
  },
  beforeMount() {
    if(localStorage.getItem('tasks') !== null) this.tasks = JSON.parse(localStorage.getItem('tasks'));
  },
  computed: {
    getTasks() {
      if(this.tasks === null) return 0;
      else return this.tasks;
    },
    idValid() {
      if(this.form.id === null) return null;
      let found = true;
      this.tasks.filter((item) => {
        if(item.trackid === this.form.id) {
          found = false;
        }
      });
      return found;
    }
  },
  methods: {
    deleteTask(id) {
      this.tasks.filter((item, index) => {
        if(item.trackid === id) {
          this.tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
      })
    },
    addTasks(evt) {
      evt.preventDefault();
      var oldItems = JSON.parse(localStorage.getItem('tasks')) || [];
      const reader = new FileReader();
      reader.onload = () => {
        var base64result = reader.result.split(',')[1];
        var newItem = {
          'trackid': this.form.id,
          'track_desc': this.form.desc,
          'track_type': this.form.track,
          'track_image': base64result,
        };
        oldItems.push(newItem);
        this.tasks.push(newItem);
        localStorage.setItem('tasks', JSON.stringify(oldItems));
        this.$bvModal.hide('bv-modal-example');
        this.form = {
          id: null,
          desc: null,
          track: null,
          file: null,
        };
      }
      reader.readAsDataURL(this.form.file);
    },
  },
}
</script>
       