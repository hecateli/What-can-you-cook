window.addEventListener('load', () => {
	ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
	const newIngredientForm = document.querySelector('#new-ingredient-form');

	newIngredientForm.addEventListener('submit', e => {
		e.preventDefault();

		const ingredient = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		ingredients.push(ingredient);

		localStorage.setItem('ingredients', JSON.stringify(ingredients));

		// Reset the form
		e.target.reset();

		Displayingredients()
	})

	Displayingredients()
})

function Displayingredients () {
	const ingredientList = document.querySelector('#ingredient-list');
	ingredientList.innerHTML = "";

	ingredients.forEach(ingredient => {
		const ingredientItem = document.createElement('div');
		ingredientItem.classList.add('ingredient-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = ingredient.done;
		span.classList.add('bubble');
		if (ingredient.category == 'vegetable') {
			span.classList.add('vegetable');
		} else if(ingredient.category == 'meat') {
			span.classList.add('meat');
		} else if(ingredient.category == 'seafood') {
			span.classList.add('seafood');
		} else if(ingredient.category == 'spices') {
			span.classList.add('spices');
		} else {
			span.classList.add('others');
		}
		content.classList.add('ingredient-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${ingredient.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		ingredientItem.appendChild(label);
		ingredientItem.appendChild(content);
		ingredientItem.appendChild(actions);

		ingredientList.appendChild(ingredientItem);

		if (ingredient.done) {
			ingredientItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			ingredient.done = e.target.checked;
			localStorage.setItem('ingredients', JSON.stringify(ingredients));

			if (ingredient.done) {
				ingredientItem.classList.add('done');
			} else {
				ingredientItem.classList.remove('done');
			}

			Displayingredients()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				ingredient.content = e.target.value;
				localStorage.setItem('ingredients', JSON.stringify(ingredients));
				Displayingredients()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			ingredients = ingredients.filter(t => t != ingredient);
			localStorage.setItem('ingredients', JSON.stringify(ingredients));
			Displayingredients()
		})

	})
}