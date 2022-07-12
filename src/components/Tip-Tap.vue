<template>
  <div class="rounded-lg p-2 dark:text-black">
    <div class="flex">
      <div class="flex">
        <div class="flex gap-2">
          <v-btn
            :loading="loading4"
            :disabled="loading4"
            type="button"
            @click="
              handleH1;
              loader = 'loading4';
            "
          >
            H1
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn type="button" @click="handleH2"> H2 </v-btn>
          <v-btn dense type="button" @click="handleH3">H3</v-btn>
          <v-btn type="button" @click="toggleBold">B</v-btn>
          <v-btn class="italic" type="button" @click="toggleItalic"> I </v-btn>
          <v-btn type="button" @click="toggleUnderline"> U </v-btn>
        </div>
      </div>
      <v-btn>
        <lord-icon
          @click="deleteText"
          src="https://cdn.lordicon.com/qsloqzpf.json"
          trigger="hover"
          colors="primary:Black"
          class="w-5 cursor-pointer"
        >
        </lord-icon>
      </v-btn>
    </div>

    <div class="mt-5 text-left">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
export default {
  components: {
    EditorContent,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editor: null,
      loader: null,
      loading4: false,
    };
  },

  methods: {
    handleH1() {
      this.editor.commands.toggleHeading({ level: 1 });
    },
    handleH2() {
      this.editor.commands.toggleHeading({ level: 2 });
    },
    handleH3() {
      this.editor.commands.toggleHeading({ level: 3 });
    },
    toggleBold() {
      this.editor.commands.toggleBold();
    },
    toggleItalic() {
      this.editor.commands.toggleItalic();
    },
    toggleUnderline() {
      this.editor.commands.toggleUnderline();
    },
    deleteText() {
      this.editor.commands.deleteSelection();
    },
  },
  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;
      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(value, false);
    },
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 500);

      this.loader = null;
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [StarterKit, Heading, Bold, Italic, Underline],
      onUpdate: () => {
        // HTML
        this.$emit("input", this.editor.getHTML());
        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style>
.ProseMirror:focus {
  outline: none;
}
.ProseMirror h1 {
  font-size: 3rem;
}
.ProseMirror h2 {
  font-size: 2.5rem;
}
.ProseMirror h3 {
  font-size: 2rem;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>