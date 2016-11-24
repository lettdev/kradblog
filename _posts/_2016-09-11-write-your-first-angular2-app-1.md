---
layout: post
title: Viết App Angular 2 đầu tiên với AngularCLI
featured_image: 
---

hehe

```shell
npm install -g angular-cli
```

```typescript
// Import class so we can register it as dependency injection token
import {TodoService} from '../todo.service';

@Component({
  // ...
  providers: [TodoService]
})
export class TodoAppComponent {
  // ...
}
```