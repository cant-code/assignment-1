<template>
  <b-container fluid>
    <b-jumbotron class="mt-3">
      <div class="h1 text-center">Evaluate</div>
      <label for="input-valid">Search by ID:</label>
      <b-form-input id="input-valid" v-model="id" placeholder="ID"></b-form-input>
      <b-button class="mt-2" type="button" variant="primary" @click="getTasks">Submit</b-button>
      <hr/>
      <b-tabs content-class="mt-3">
        <b-tab title="Ungraded" active>
          <b-row>
            <b-col lg="3" md="4" cols="6" v-for="(item, index) in tasksList" :key="item.student_id">
              <b-card-group>
                <b-card :img-src="'data:image/png;base64,'+item.image" img-top class="mb-3">
                  <b-card-title>{{item.student}}</b-card-title>
                  <div class="d-flex">
                    <b-form-input type="number" :state="gradeCheck(index)" :id="'marks'+index" v-model="marks[index]" placeholder="Marks"/>
                    <b-button variant="dark" class="ml-2" @click="addGrade(item.task_id, item.student_id, index)">
                      <b-icon icon="plus" variant="white"></b-icon>
                    </b-button>
                  </div>
                  <b-form-invalid-feedback :state="gradeCheck(index)">
                    Grade must be from 1-10
                  </b-form-invalid-feedback>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Graded">
          <b-row>
            <b-col lg="3" md="4" cols="6" v-for="(item) in gradedList" :key="item.student_id">
              <b-card-group>
                <b-card :img-src="'data:image/png;base64,'+item.image" img-top class="mb-3">
                  <b-card-title>{{item.student}}</b-card-title>
                  <div class="d-flex">
                    <b-card-text>Grade: {{ item.grade }}</b-card-text>
                    <b-button variant="dark" class="ml-auto" @click="deleteGrade(item.task_id, item.student_id)">
                      <b-icon icon="trash" variant="white"></b-icon>
                    </b-button>
                  </div>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-jumbotron>
  </b-container>
</template>

<script>
import json from "@/assets/studentData.json";  

export default {
  data() {
    return {
      marks: [],
      id: null,
      tasks: [],
      items: [],
      graded: [],
      ungraded: [],
      grades: []
    }
  },
  beforeMount() {
    this.tasks = json.data;
    if(localStorage.getItem('student_grade') !== null) this.grades = JSON.parse(localStorage.getItem('student_grade'));
  },
  computed: {
    tasksList() {
      if(this.ungraded.length > 0) return this.ungraded;
      return 0;
    },
    gradedList() {
      if(this.graded.length > 0) return this.graded;
      return 0;
    }
  },
  methods: {
    gradeCheck(index) {
      if(this.marks[index] === null) return null; 
      return (this.marks[index] > 0 && this.marks[index] < 11) ? true: false;
    },
    sortList() {
      this.graded = [];
      this.ungraded = [];
      if(this.items.length !== 0) {
        this.items.map((item) => {
          let found = false;
          if(this.grades.length > 0) 
          {
            this.grades.map((grade) => {
            if((item.task_id == grade.task_id) && (item.student_id == grade.student_id)) {
              found = true;
              item.grade = grade.grade;
              this.graded.push(item);
            }
            });
            if(found===false) this.ungraded.push(item);
          }
          else this.ungraded.push(item);
        });
      }
    },
    getTasks() {
      this.items = [];
      this.tasks.filter((item) => {
        if(item.task_id == this.id) {
          this.items.push(item);
        }
      });
      this.sortList();
    },
    deleteGrade(id, stud_id) {
      this.grades.filter((item, index) => {
        if(item.task_id === id && item.student_id === stud_id) {
          this.grades.splice(index, 1);
          localStorage.setItem('student_grade', JSON.stringify(this.grades));
          this.sortList();
        }
      })
    },
    addGrade(id, stud_id, grade) {
      var oldItems = JSON.parse(localStorage.getItem('student_grade')) || [];
      var newItem = {
        'task_id': id,
        'student_id': stud_id,
        'grade': this.marks[grade],
      };
      oldItems.push(newItem);
      this.grades.push(newItem);
      localStorage.setItem('student_grade', JSON.stringify(oldItems));
      this.marks[grade] = '';
      this.sortList();
    },
  },
}
</script>